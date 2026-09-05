const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
	const authorization = req.headers.authorization || '';
	const token = authorization.startsWith('Bearer ')
		? authorization.slice(7)
		: null;

	if (!token) {
		return res.status(401).json({ message: 'Authentication token is required' });
	}

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET || 'bhumi-setu-development-secret');
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired authentication token' });
	}
}

module.exports = requireAuth;
