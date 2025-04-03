const express = require("express");

const router = express.Router();

const { getOrders } = require("./../handlers/order-handler");
router.get("", async (req, res) => {
  const orders = getOrders();
  res.send(orders);
});

module.exports = router;
