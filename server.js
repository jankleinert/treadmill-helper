const express = require('express');
const app = express();
const host = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  	next();
});

app.get('/', function (req, res, next) {
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
				  result: 'Invalid request.'});
	}
});

app.listen(port, host);
console.log('Treadmill Helper started on: ' + host + ':' + port);