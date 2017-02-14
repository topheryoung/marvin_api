const express = require('express');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

// Cron stuff imports
const schedule = require('node-schedule');
const request = require('request');

// Routes
const userRoutes = require("./routes/users");

// Set API variables
const app = express();
app.set('port', process.env.PORT || 3000);

// Development Server
if (app.get('env') == 'development') {
	mongoose.connect('mongodb://localhost/marvin');
}
if (app.get('env') == 'production') {
	mongoose.connect(process.env.MONGODB_URI);
}


//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

app.get('/', (req, res) => {
	res.status(200).send('Marvin Music API. View docs on API endpoints.')
})


app.use(userRoutes);


// Testing cron jobs for resetting marvin controls - Move to a new file once deved
const http = require('http');
var allControls;
var balanceOnly;
if (app.get('env') == 'development') {
	allControls = 'http://localhost:3000/marvincontrols/reset',
	balanceOnly = 'http://localhost:3000/marvincontrols/resetBalance'
}
if (app.get('env') == 'production') {
	// options = {
	// 	host: process.env.MONGODB_URI,
	// 	path: '/users/marvincontrols/reset'
	// }
}

// var resetBalance = setInterval( () => {
// 	http.post(balanceOnlyOptions, (res) => {
// 		console.log('STATUS: ' + res.statusCode);
// 		console.log('HEADERS: ' + JSON.stringify(res.headers));
// 		console.log('This should run every 1 minute')
// 	})
// }, 60000);

var resetBalance = schedule.scheduleJob('0 * * * *', function(){
  request.post(balanceOnly, (err, res) => {
  	if(err) { console.log(err) }
  	else { console.log('Balance Reset') }
  })
});

var resetAll = schedule.scheduleJob('0 0 * * *', function(){
  request.post(allControls, (err, res) => {
  	if(err) { console.log(err) }
  	else { console.log('Reset All Controls') }
  })
});

/*
	Ramp server up
*/
app.listen(app.get('port'), () => {
	console.log("App running on port " + app.get('port'));
});