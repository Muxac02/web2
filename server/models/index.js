const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db ={};
db.mongoose = mongoose;

db.user = require("./user.model");
db.chat = require("./chats.model");
db.message = require("./messages.model");

module.exports = db;