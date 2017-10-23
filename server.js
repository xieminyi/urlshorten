'use strict';

const express 	 = require('express');
const bodyParser = require('body-parser');
const app     	 = express();
const mongoose 	 = require('mongoose');
const config     = require('./server/config');

// Initiate mongodb
const urlSchema  = require('./server/api/urlsdatabase');
mongoose.connect(config.mongodb.url, {
	useMongoClient: true,
}); 

// API file for interaction
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/*', function(req, res, next){ // Enable Cross Origin Resource Sharing

	//CORS headers
	res.header("Access-Control-Allow-Origin", "*"); 
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	// Set custom headers for CORS
	res.header("Access-Control-Allow-Headers", "Content-type,Accpet,X-Access-Token,X-key");
	if(req.method == "OPTIONS"){
		res.status(200).end();
	}
	else{
		next();
	}
});

// Angular DIST output folder
app.use(express.static(__dirname + '/dist'));

// API location
app.use('/', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

// If no route is matched by now, it must be a 400
app.use(function(err, req, res, next) {
  	res.status(400);
  	res.setHeader('Content-Type', 'application/json');
  	res.send(JSON.stringify({
    	error:'Could not decode request: JSON parsing failed'
  	}, null, 3));
});

// Start server

const port = process.env.PORT || '3000';

app.listen(port);
console.log(`Running on localhost:${port}`);

// for testing
module.exports = app; 

