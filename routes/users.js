const router = require("express").Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

router
	.get('/users', (req, res, next) => {
		mongoose.model('users')
			.find((err, users) => {
				res.status(200).send(users);
			})
	})
	.get('/users/:userId', (req, res, next) => {
		mongoose.model('users')
			.find({_id: ObjectID(req.params.userId)}, (err, result) => {
				if(err) { console.log(err)}
				if(!result.length) { res.status(404).send("No matches found")}
				else { res.send(result)}
			})
	})
	.post('/newUser/:first_name/:last_name/:email/:password', (req, res, next) => {
		mongoose.model('users')
			.create(req.params, (err, result) => {
				res.status(200).send(result)
			})
	})
	.post('/users/:userId/balance/:newBalance', (req, res, next) => {
		mongoose.model('users')
			.findByIdAndUpdate(ObjectID(req.params.userId), {$set: {'marvin_controls.balance': req.params.newBalance}}, {new: true}, (err, result) => {
				if(err) { console.log(err)}
				res.send(result)
			})
	})
	.post('/users/marvincontrols/reset', (req, res, next) => {
		mongoose.model('users')
			.update(
				{},
				{
					'marvin_controls.balance': 10,
					'marvin_controls.rockets': 7,
					'marvin_controls.bombs': 5
				},
				{new: true, multi: true, setDefaultsOnInsert: true, safe: true, upsert: true},
				(err, result) => {
					if(err) { console.log(err)}
					res.send(result)
				}
			)
	})

module.exports = router;