const express = require('express');
const Project = require('../models/Project');
const requireAuth = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
	try {
		const projects = await Project.find().populate('createdBy', 'userId username').sort({ createdAt: -1 });
		return res.json(projects);
	} catch (error) {
		return res.status(500).json({ message: 'Unable to load projects' });
	}
});

router.post('/', async (req, res) => {
	try {
		const project = await Project.create({ ...req.body, createdBy: req.user.userObjectId });
		return res.status(201).json(project);
	} catch (error) {
		return res.status(400).json({ message: 'Unable to create project', error: error.message });
	}
});

router.post('/compensate/:projectId', async (req, res) => {
	const { projectId } = req.params;
	const area = String(req.body.area || '').trim().toLowerCase();
	const realPrice = Number(req.body.realPrice);

	if (!Project.base.Types.ObjectId.isValid(projectId)) {
		return res.status(400).json({ message: 'Invalid project ID' });
	}

	if (!['rural', 'urban'].includes(area)) {
		return res.status(400).json({ message: 'Area must be rural or urban' });
	}

	if (!Number.isFinite(realPrice) || realPrice < 0) {
		return res.status(400).json({ message: 'realPrice must be a non-negative number' });
	}

	const multiplier = area === 'rural' ? 2 : 1.2;
	const compensation = realPrice * multiplier;

	try {
		const project = await Project.findOneAndUpdate(
			{ _id: projectId, createdBy: req.user.userObjectId },
			{ $set: { compensation, status: 'compensated' } },
			{ new: true, runValidators: true },
		);

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		return res.json({ project, area, realPrice, multiplier, compensation });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to calculate compensation' });
	}
});

module.exports = router;
