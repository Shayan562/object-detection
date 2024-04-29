const express = require("express");
const authenticate = require("../Middlewares/auth");
const { getRoom, insertItems } = require("../Controllers/itemsController");

const itemRouter = express.Router();

itemRouter.get("/:item", authenticate, getRoom);
itemRouter.post("/", authenticate, insertItems);

module.exports = itemRouter;
