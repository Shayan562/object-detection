const { Schema, model } = require("mongoose");

const Login = Schema({
	userID: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const UserDetailsModel = model("UserDetails", Login);
module.exports = UserDetailsModel;
