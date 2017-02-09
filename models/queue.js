const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const queueSchema = new Schema({
	song_name: String,
	artist: String,
	album: String,
	albumArt: String
});

mongoose.model('queue', queueSchema);