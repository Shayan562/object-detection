const jwt = require("jsonwebtoken");
const { _SECRETKEY } = require("../../config");

const authenticate = (req, res, next) => {
	try {
		//extract token
		const token = req.headers.authorization.split(" ")[1];
		//verify, set and move to the next function
		const { userID } = jwt.verify(token, _SECRETKEY);
		req.userID = userID;
		next();
	} catch (err) {
		res.status(500).json({ message: "Verification Failed" });
	}
};

module.exports = authenticate;
