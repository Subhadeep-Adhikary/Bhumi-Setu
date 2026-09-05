const express = require('express');
const axios = require('axios');
const Project = require('../models/Project');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
	try {
		const projects = await Project.find({ createdBy: req.user.userObjectId })
			.populate('createdBy', 'userId username')
			.sort({ createdAt: -1 });
		return res.json(projects.map((project) => ({
			...project.toObject(),
			status: getWorkflowStatus(project),
		})));
	} catch (error) {
		return res.status(500).json({ message: 'Unable to load projects' });
	}
});

function getWorkflowStatus(project) {
	const stages = project.stages || [];
	return stages.length > 0 && stages.every((stage) => stage.status === 'completed')
		? 'completed'
		: 'pending';
}

router.post('/', async (req, res) => {
	try {
		const projectName = String(req.body.projectName || '').trim();
		const description = String(req.body.description || '').trim();
		const parcelId = String(req.body.parcelId || '').trim();

		if (!projectName || !description || !parcelId) {
			return res.status(400).json({ message: 'Project name, description, and parcel ID are required' });
		}

		const verification = await axios.get(`http://127.0.0.1:6000/land/${encodeURIComponent(parcelId)}`);
		if (!verification.data.verified) {
			return res.status(400).json({ message: 'Parcel could not be verified by the government API' });
		}

		const project = await Project.create({
			...createGeneratedProject({ projectName, description, parcelId, verification: verification.data }),
			createdBy: req.user.userObjectId,
		});
		return res.status(201).json(project);
	} catch (error) {
		if (error.response?.status === 404) {
			return res.status(404).json({ message: 'Parcel ID was not found in the mock land database' });
		}
		if (error.code === 11000) {
			return res.status(409).json({ message: 'A project already exists for this parcel' });
		}
		if (error.response?.data || error.code === 'ECONNREFUSED') {
			return res.status(502).json({ message: 'Government verification service is unavailable' });
		}
		return res.status(400).json({ message: 'Unable to create project', error: error.message });
	}
});


function createGeneratedProject({ projectName, description, parcelId, verification }) {
	const {
		state, district, landowner, landArea, landUse, marketValue, landType, document,
	} = verification;
	const rural = landType === 'rural';
	const parcelVerified = Boolean(parcelId);
	const documentVerified = Boolean(document?.name);
	const amount = Math.round(Number(landArea) * marketValue * (rural ? 2 : 1));
	const stages = [
		['Project created', '1', 'Project Registration', 'Start'],
		['GIS parcel analysis', '2', 'Parcel Analysis', 'GIS'],
		['Owner and document verification', '3', 'Verification', 'Records'],
		['Compensation process', '4', 'Compensation', 'Payment'],
		['Dispute management', '5', 'Disputes', 'Resolution'],
		['Land acquired', '6', 'Acquisition', 'Complete'],
	].map(([stageTitle, short, stageDescription, date], index) => {
		const completed = index === 0 || (index === 1 && parcelVerified) || (index === 2 && documentVerified);
		const active = index === 3 && parcelVerified && documentVerified;

		return {
			title: stageTitle,
			short,
			description: stageDescription,
			date,
			status: completed ? 'completed' : active ? 'active' : 'pending',
			activeLabel: active ? 'In Progress' : undefined,
		};
	});

	return {
		id: `P${Date.now()}`,
		name: projectName,
		title: projectName,
		description,
		parcelId,
		state,
		district,
		status: 'pending',
		progress: 0,
		risk: 'Low',
		stages,
		compensation: {
			landArea,
			marketValue: String(marketValue),
			multiplier: rural ? 'Rural (2x)' : 'Urban',
			landUse,
			solatiumRate: 0.1,
			payments: [{ name: landowner, amount, date: '—', status: 'Pending' }],
		},
		documents: [{
			name: document.name,
			owner: landowner,
			plot: parcelId,
			area: `${landArea} ha`,
			match: document.match,
			status: 'Verified',
			action: 'View',
		}],
	};
}

router.post('/compensate/:projectId', async (req, res) => {
	const { projectId } = req.params;
	const area = String(req.body.area || '').trim().toLowerCase();
	const realPrice = Number(req.body.realPrice);

	if (!['rural', 'urban'].includes(area)) {
		return res.status(400).json({ message: 'Area must be rural or urban' });
	}

	if (!Number.isFinite(realPrice) || realPrice < 0) {
		return res.status(400).json({ message: 'realPrice must be a non-negative number' });
	}

	const multiplier = area === 'rural' ? 2 : 1;
	const compensation = realPrice * multiplier;

	try {
		const projectQuery = {
			createdBy: req.user.userObjectId,
			$or: [{ id: projectId }],
		};
		if (Project.base.Types.ObjectId.isValid(projectId)) {
			projectQuery.$or.push({ _id: projectId });
		}

		const existingProject = await Project.findOne(projectQuery);
		if (!existingProject) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const documentsVerified = existingProject.documents.length > 0
			&& existingProject.documents.every((document) => document.status === 'Verified');
		if (!documentsVerified) {
			return res.status(400).json({ message: 'All project documents must be verified before payment' });
		}

		existingProject.compensation.marketValue = String(realPrice);
		existingProject.compensation.multiplier = area === 'rural' ? 'Rural (2x)' : 'Urban';
		existingProject.compensation.payments.forEach((payment) => {
			payment.status = 'Paid';
			payment.date = new Date().toISOString().slice(0, 10);
		});
		existingProject.stages = existingProject.stages.map((stage) => {
			if (stage.title === 'Compensation process') return { ...stage.toObject(), status: 'completed', activeLabel: undefined };
			return stage;
		});
		const acquisitionReached = existingProject.stages.length > 0
			&& existingProject.stages.every((stage) => stage.status === 'completed');
		existingProject.status = acquisitionReached ? 'completed' : 'pending';
		const project = await existingProject.save();

		return res.json({ project, area, realPrice, multiplier, compensation });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to calculate compensation' });
	}
});

module.exports = router;
