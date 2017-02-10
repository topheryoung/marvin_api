const express = require('express');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');

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
	mongoose.connect('mongodb://heroku_d61v388l:shilmjov845d87i5fap8gh38k5@ds149049.mlab.com:49049/heroku_d61v388l');
}


//load all files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

app.get('/', (req, res) => {
	res.status(200).send('Marvin Music API. View docs on API endpoints.')
})


app.use(userRoutes);


/*
	Ramp server up
*/
app.listen(app.get('port'), () => {
	console.log("App running on port " + app.get('port'));
});