const express = require('express');
const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.get('/', function (req, res, next) {
	console.log('get request');
	var result;

	if (req.query.mph !== undefined) {
		result = parseFloat(req.query.mph) * 1.609344;
	} else if (req.query.kph !== undefined) {
		result = parseFloat(req.query.kph )* 0.621371;
	}

	if (result !== undefined && result !== null && result != NaN) {
		res.send({success: true,
				  result: result});
	} else {
		res.send({success: false,
				  result: "Invalid request."});
	}

	console.log(req.query);	
});

app.listen(3001, () => console.log('Example app listening on port 3001!'))