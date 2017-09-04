const express = require('express');
const router = express.Router();

// Implement the products API endpoint
router.post('/', (req, res, next) => {
  const order = {
    orderId: "WEB828738" + Math.floor(Math.random() * 200),
    message:"Thank you!. We have received your order, admin will review and approve the order for shipment."
  };

  //Send response
  res.json(order);
});

module.exports = router;