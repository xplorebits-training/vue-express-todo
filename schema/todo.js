const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	title: String,
	description: {
		type: String,
		required: [true, "Decription is required"]
	},
	due: String,
	userId: String
});

module.exports = todoSchema;
