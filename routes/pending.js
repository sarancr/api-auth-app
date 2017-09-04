const express = require('express');
const router = express.Router();

// Implement the pending API endpoint
router.put('/', (req, res, next) => {
  //Send dummy status approved or denied
  res.json({ status: "approved" });
});

module.exports = router;