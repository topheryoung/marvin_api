// const MongoClient = require("mongodb");

// MongoClient.connect("mongodb://localhost/marvin", (err, connection) => {
// 	if(err) { console.log(err)}
// 	module.exports.db = connection
// });

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/marvin')
module.exports.db = mongoose.connection;