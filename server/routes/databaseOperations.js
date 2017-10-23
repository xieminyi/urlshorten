'use strict';


const mongoose = require('mongoose');
const url = mongoose.model('urlSchema');

//!\ METHOD : find target url record
// - @return record of url and its short key
// - @return error
exports.find_url = function(req, res) {
	url.find({key: req.query.key}, function(err, url) {
		if (err)
			res.send(err);
		res.json(url);
	});
};

//!\ METHOD : create new document
// - @return record of url and its short key
// - @return error
exports.create_a_url = function(req, res) {
  // enfore https:// at beginning
  if(!req.body.original_url.includes('http://') && !req.body.original_url.includes('https://')){
    req.body.original_url = 'https://' + req.body.original_url;
  }

  // save new data to database
  var new_url = new url(req.body);
  new_url.save(function(err, url) {
    if (err)
      res.send(err);
    res.json(url);
  });
};

