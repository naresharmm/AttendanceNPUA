const jwt = require('jsonwebtoken');
async function verifyToken(req, res, next){
	const token = req.header('Authorization');
	if (!token) return res.status(401).json({ error: 'Access denied' });
	try {
		const decoded = await jwt.verify(token, 'secret');

		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid token' });
	}
};

module.exports = verifyToken;