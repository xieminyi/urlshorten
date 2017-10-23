console.log('Here: routers api');

const express = require('express');
const router  = express.Router();
const operations  = require('./databaseOperations');
const shortKey  = require('./shortKey');

// Set routers
router.get('/api/find', operations.find_url);
router.post('/api/create', operations.create_a_url);

router.get('/api/generateShortCode', shortKey.generate_short_code);

router.get('/', (req, res) => {
  res.status(200).end();
});

module.exports = router;