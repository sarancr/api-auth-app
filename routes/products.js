const express = require('express');
const data = require('../data/products');

const router = express.Router();

// Implement the products API endpoint
router.get("/", (req, res, next) => {
  //Send products data
  res.json(data);
});

module.exports = router;