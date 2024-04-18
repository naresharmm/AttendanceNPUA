const User = require("../models/User");
const Role = require("../models/Role");

async function hasRole(req, res, next, requiredRoles) {
	try {
 		const roles = await Role.find({});
		const roleNames = roles.map(role => role.name);
		const user = await User.findById(req.userId);

		if (!user || !user.role || !requiredRoles.some(role => roleNames.includes(role))) {
			return res.status(403).json({ message: "Not allowed by this user role" });
		}

		next();
	} catch (error) {
		console.error("Error in hasRole middleware:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = hasRole;
