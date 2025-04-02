const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: Number,
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
