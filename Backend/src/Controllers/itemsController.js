const {
	getRoomSuggestion,
	InsertIntoDB,
	insertIntoDB,
} = require("../Database/itemsMongo");

const getRoom = async (req, res) => {
	const userID = req.userID;
	const { item } = req.params;
	const room = await getRoomSuggestion(userID, item);
	if (!room) {
		return res.status(404).json({ message: "Item Not in DB" });
	}
	res.status(200).json({ userID, item, room });
};

const insertItems = async (req, res) => {
	const userID = req.userID;
	const { room, itemList } = req.body;
	const status = await insertIntoDB(userID, room, itemList);
	if (status) {
		return res.status(200).json({ message: status });
	}
	res.status(500).json({ message: "Something Went Wrong" });
};

module.exports = { getRoom, insertItems };
