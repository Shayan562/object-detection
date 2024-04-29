const { userInfo, userExists } = require("../Database/userMongo");
const { _SALT, _SECRETKEY } = require("../../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDetailsModel = require("../Models/userModels");

const login = async (req, res) => {
	const { userID, password } = req.body;
	const user = await userInfo(userID);
	if (user == null) {
		return res.status(404).json({ message: "User Does Not Exist" });
	}

	//Verify Password
	const passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		res.status(401).json({ message: "Invalid Credentials" });
	}

	//Generate Token
	const token = jwt.sign({ userID: userID }, `${_SECRETKEY}`);
	req.userID = userID;
	res.status(200).json({ authorization: `bearer ${token}` });
	// res.json({ hashedPass });
};
const signUp = async (req, res) => {
	const { userID, password } = req.body;
	const userAlreadyExists = await userExists(userID);
	if (userAlreadyExists) {
		return res.status(400).json({ message: "User Already Exists" });
	}
	//User id is unique so hash the pass word
	const hashedPass = await bcrypt.hash(password, _SALT);
	const result = await UserDetailsModel.create({
		userID,
		password: hashedPass,
	});
	// const result = await newUser.save();
	if (result) res.status(200).json({ message: "User Created Successfully" });
};

module.exports = { login, signUp };
