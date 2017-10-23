'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const urlSchema = new Schema({
  // key is used in short url: random key or prefered nickname
  key: {
    type: String
  },
  // long url
  original_url: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('urlSchema', urlSchema);