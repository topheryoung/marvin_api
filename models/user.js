const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Users schema
const usersSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	marvin_controls: {
		balance: {type: Number, default: 10},
		rockets: {type: Number, default: 7},
		bombs: {type: Number, default: 5}
	}
});

mongoose.model('users', usersSchema);