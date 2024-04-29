const { default: mongoose } = require("mongoose");
const { _MONGO } = require("../config");
const items = require("./Models/itemModel");
const UserDetails = require("./Models/userModels");
const userRouter = require("./Routes/userRoutes");
const itemRouter = require("./Routes/itemRoutes");
const authenticate = require("./Middlewares/auth");
express = require("express");
cors = require("cors");

//Init express
app = express();
app.use(cors());
app.use(express.json());

//For errors
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status.send("Some Error Occured");
});
// app.get("/:test", (req, res) => {
// 	res.status(200).json({ test: req.params.test });
// 	console.log(req.params);
// });

app.use("/user", userRouter);
app.use("/item", itemRouter);

app.get("/auth", authenticate, (req, res) => {
	const userID = req.userID;
	res.status(200).json({ userID });
});

app.post("/", (req, res) => {
	// console.log("Printing Req");
	// console.log(req.body);
	// res.status(200).json({ Good: "OK" });
	const { userID, room, items } = req.body;
	const newUser = new UserDetails({
		userID,
		password: "123",
	});
	newUser.save();
	// const value = items.find();
	res.json({ userID, room, items });
});

mongoose
	.connect(_MONGO)
	.then(() => {
		app.listen(5000, () => {
			console.log(app.ip);
		});
	})
	.catch(() => {
		console.log("There was an error connecting to the DB");
	});
