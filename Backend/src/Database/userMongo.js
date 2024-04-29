const UserDetails = require("../Models/userModels");

const userInfo = async (userID) => {
	const user = await UserDetails.findOne({ userID: userID });
	return user;
};
const userExists = async (userID) => {
	const user = await UserDetails.findOne({ userID });
	if (user) {
		return true;
	}
	return false;
};
// const getPassword = async (userID) => {
// const pass = await UserDetails.findOne({ userID: userID });
// };

module.exports = { userInfo, userExists };

// Usage:
// findUserById('some_user_id');
