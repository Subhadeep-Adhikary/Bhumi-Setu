const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			unique: true,
			default: () => crypto.randomUUID(),
			index: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minLength: 3,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
