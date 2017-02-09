const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Users schema
const usersSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	marvin_controls: {
		type: Array,
		default: {
			balance: 10,
			rockets: 7,
			bombs: 5
		}
	}
});

mongoose.model('users', usersSchema);