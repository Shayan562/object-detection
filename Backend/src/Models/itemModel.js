const { Schema, model } = require("mongoose");

// const ItemSchema = new Schema(
// 	{
// 		item: String,
// 		count: Number,
// 	},
// 	{ _id: false }
// );

// const RoomSchema = new Schema(
// 	{
// 		room: String,
// 		itemList: [ItemSchema],
// 	},
// 	{ _id: false }
// );

const Items = new Schema({
	userID: {
		type: String,
		required: true,
	},
	items: [
		{
			room: { type: String, required: true },
			item: { type: String, required: true },
			count: { type: Number, required: true },
			_id: false,
		},
		{ _id: false },
	],
	// rooms: [RoomSchema],
});

const ItemDetails = model("ItemDetails", Items);
// export default User;
module.exports = ItemDetails;
