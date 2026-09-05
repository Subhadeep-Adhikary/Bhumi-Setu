const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'bhumi-setu-development-secret';

function createToken(user) {
	return jwt.sign(
		{ userId: user.userId, userObjectId: user._id.toString(), username: user.username },
		jwtSecret,
		{ expiresIn: '7d' },
	);
}

router.post('/register', async (req, res) => {
	try {
		const username = String(req.body.username || '').trim();
		const password = String(req.body.password || '');

		if (username.length < 3 || password.length < 6) {
			return res.status(400).json({ message: 'Username must be at least 3 characters and password at least 6 characters' });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(409).json({ message: 'Username is already registered' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({ username, password: hashedPassword });

		return res.status(201).json({
			token: createToken(user),
			user: { userId: user.userId, username: user.username },
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).json({ message: 'Username is already registered' });
		}
		return res.status(500).json({ message: 'Unable to register user' });
	}
});

router.post('/login', async (req, res) => {
	try {
		const username = String(req.body.username || '').trim();
		const password = String(req.body.password || '');
		const user = await User.findOne({ username }).select('+password');

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		return res.json({
			token: createToken(user),
			user: { userId: user.userId, username: user.username },
		});
	} catch (error) {
		return res.status(500).json({ message: 'Unable to log in' });
	}
});

module.exports = router;
