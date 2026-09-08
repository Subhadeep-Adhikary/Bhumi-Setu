const jwt = require('jsonwebtoken');

const revokedTokens = new Map();

function revokeToken(token, expiresAt) {
	revokedTokens.set(token, expiresAt);
}

function isRevoked(token) {
	const expiresAt = revokedTokens.get(token);
	if (!expiresAt) return false;
	if (expiresAt <= Date.now()) {
		revokedTokens.delete(token);
		return false;
	}
	return true;
}

function requireAuth(req, res, next) {
	const authorization = req.headers.authorization || '';
	const token = authorization.startsWith('Bearer ')
		? authorization.slice(7)
		: null;

	if (!token) {
		return res.status(401).json({ message: 'Authentication token is required' });
	}
	if (isRevoked(token)) {
		return res.status(401).json({ message: 'Session has been logged out' });
	}

	try {
		req.user = jwt.verify(token, process.env.JWT_SECRET || 'bhumi-setu-development-secret');
		return next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid or expired authentication token' });
	}
}

module.exports = requireAuth;
module.exports.revokeToken = revokeToken;
