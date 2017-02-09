const express = require('express');
// const bodyParser = require('body-parser');
// const mongo  = require('./db');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

// Set API variables
const app = express();
app.set('port', process.env.PORT || 3000);

// Development Server
if (app.get('env') == 'development') {
	mongoose.connect('mongodb://localhost/marvin');
}


//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

app.get('/', (req, res) => {
	res.send('Marvin Music API. View docs on API endpoints.')
})

/* 	
	GET Users
	Params: none
	return: all users
*/
// app.get('/users', (req, res, next) => {
// 	mongo.db.collection("users")
// 		.find()
// 		.toArray((err, users) => {
// 			res.send(users)
// 		})
// });
app.get('/users', (req, res, next) => {
	mongoose.model('users')
		.find((err, users) => {
			res.send(users)
		})
});

/* 	
	GET Single User
	Params: String converted to Object.ID
	return: user
*/
// app.get('/users/:userId', (req, res, next) => {
// 	mongo.db.collection("users")
// 		.find({_id: ObjectID(req.params.userId)}, (err, result) => {
// 			if(err) { console.log(err)}
// 			result.toArray((err, user) => {
// 				if(!user.length) { res.send("No matches found") }
// 				else { res.send(user) }
// 			})
// 		})
// });
app.get('/users/:userId', (req, res, next) => {
	mongoose.model('users')
		.find({_id: ObjectID(req.params.userId)}, (err, result) => {
			if(err) { console.log(err)}
			if(!result.length) { res.send("No matches found")}
			else { res.send(result)}
		})
});

/* 	
	POST Single User
	Params: String converted to Object.ID
	return: user
*/
// app.get('/newUser/:first_name/:last_name/:email/:password', (req, res, next) => {
// 	mongo.db.collection("users")
// 		.insert(req.params, (err, result) => {
// 			res.send(result)
// 		})
// })
app.get('/newUser/:first_name/:last_name/:email/:password', (req, res, next) => {
	mongoose.model('users')
		.create(req.params, (err, result) => {
			res.send(result)
		})
})

/*
	Ramp server up
*/
app.listen(app.get('port'), () => {
	console.log("App running on port " + app.get('port'));
});