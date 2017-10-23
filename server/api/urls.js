'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var urlSchema = new Schema({
  key: {
    type: String
  },
  original_url: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('urlSchema', urlSchema);