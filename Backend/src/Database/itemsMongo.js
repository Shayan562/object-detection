const itemDetailsModel = require("../Models/itemModel");

const getRoomSuggestion = async (userID, item) => {
	const details = await itemDetailsModel.aggregate([
		{ $match: { userID: userID } },
		{ $unwind: "$items" },
		{ $match: { "items.item": item } },
		{ $group: { _id: "$items.room", count: { $sum: "$items.count" } } },
		{ $sort: { count: -1 } },
	]);
	//use array incase there are multiple values with max number

	if (details.length == 0) {
		return null;
	}
	const maxVal = details[0].count;
	const rooms = [];
	details.forEach((val) => {
		if (val.count == maxVal) {
			rooms.push(val._id);
		}
	});
	return rooms;
};
const insertIntoDB = async (userID, room, itemList) => {
	/*
		1. Check if user item list exists
		2. Check if room + item combo exists
		3. If does not exist -> Create New
		4. Else Update
	*/
	//this only update

	// const vals = [];

	//check if users doc exists
	const userSearch = await itemDetailsModel.findOne({ userID: userID });
	if (!userSearch) {
		//create new if it doesnt exist
		const newUserRecord = await itemDetailsModel.create({
			userID: userID,
			items: [],
		});
	}

	// await Promise.all(
	// itemList.map(async (item) => {
	for (const item of itemList) {
		// const searchResult = await itemDetailsModel.find({
		// 	userID: userID,
		// 	items: { $elemMatch: { room: room, item: item } },
		// });
		// //item does not exist
		// if (searchResult.length < 1) {
		// 	const newItem = await itemDetailsModel.updateOne(
		// 		{ userID: userID },
		// 		{ $push: { items: { room: room, item: item, count: 1 } } }
		// 	);
		// 	//item exists
		// } else {
		// 	console.log(`inc ${item}`);
		// 	//get the count of the item
		// 	const countItem = await itemDetailsModel.findOne(
		// 		{
		// 			userID: userID,
		// 			items: { $elemMatch: { room: room, item: item } },
		// 		},
		// 		{ _id: false, items: { $elemMatch: { room: room, item: item } } }
		// 	);
		// 	//delete old value from array (issue with mongo db)
		// 	const value = Number(countItem.items[0].count) + 1;
		// 	await itemDetailsModel.updateOne(
		// 		{
		// 			userID: userID,
		// 			items: {
		// 				$elemMatch: {
		// 					room: room,
		// 					item: item,
		// 				},
		// 			},
		// 		},
		// 		{
		// 			$pull: {
		// 				items: {
		// 					$elemMatch: {
		// 						room: room,
		// 						item: item,
		// 					},
		// 				},
		// 			},
		// 		}
		// 	);
		// 	//add new val to db
		// 	const newItem = await itemDetailsModel.updateOne(
		// 		{ userID: userID },
		// 		{
		// 			$addToSet: {
		// 				items: {
		// 					room: room,
		// 					item: item,
		// 					count: value,
		// 				},
		// 			},
		// 		}
		// 	);
		// console.log(count.items[0].count);
		// return count;

		const details = await itemDetailsModel.findOneAndUpdate(
			{ userID: userID, "items.room": room, "items.item": item },
			{ $inc: { "items.$.count": 1 } },
			{ new: true, upsert: true }
		);
		console.log(`Updated details: ${JSON.stringify(details)}`);

		// if (details) vals.push(details);
		// }
		// vals.push(searchResult);
		// console.log(searchResult);
		// console.log()
		// console.log(details);
		// 	})
		// );
	}
	// return vals;
	return true;
};

const insertOperation = async () => {};

const insertData = async (userID) => {
	const result = await itemDetailsModel.create({
		userID: userID,
		items: [
			{
				room: "BedRoom",
				item: "Key",
				count: 10,
			},
			{
				room: "BedRoom",
				item: "Wallet",
				count: 1,
			},
		],
	});
	// const result = await newUser.save();
	if (result) return result;
};
module.exports = { getRoomSuggestion, insertIntoDB };
