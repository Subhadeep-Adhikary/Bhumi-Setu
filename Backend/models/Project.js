const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: '',
		},
		documentId: { type: String, required: true },
		status: {
			type: String,
			enum: ['pending', 'in-progress', 'completed', 'compensated'],
			default: 'pending',
		},
		compensation: { type: Number, default: 0, min: 0 },
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

projectSchema.index({ createdBy: 1, documentId: 1 }, { unique: true });

module.exports = mongoose.model('Project', projectSchema);
