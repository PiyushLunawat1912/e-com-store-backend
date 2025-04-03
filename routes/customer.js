const express = require("express");
const router = express.Router();
const { getNewProducts, getProduct } = require("../handlers/product-handler");
const { getFeaturedProducts } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getProductForListing } = require("../handlers/product-handler");
const { getBrands } = require("../handlers/brand-handler");
const {
  addToWishList,
  removeFromWishList,
  getWishList,
} = require("../handlers/wishlist-handler");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
} = require("../handlers/cart-handler");

const { addOrder, getCustomerOrder } = require("../handlers/order-handler");

router.get("/new-products", async (req, res) => {
  const products = await getNewProducts();
  res.send(products);
});

router.get("/featured-products", async (req, res) => {
  const products = await getFeaturedProducts();
  res.send(products);
});

router.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
});

router.get("/brands", async (req, res) => {
  const brands = await getBrands();
  res.send(brands);
});

router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, brandId, sortBy, sortOrder, page, pageSize } =
    req.query;
  const products = await getProductForListing(
    searchTerm,
    categoryId,
    brandId,
    sortBy,
    sortOrder,
    page,
    pageSize
  );
  res.send(products);
});

router.get("/product/:id", async (req, res) => {
  const id = req.params["id"];
  const product = await getProduct(id);
  res.send(product);
});

router.get("/Wishlist", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const items = await getWishList(userId);
  res.send(items);
});

router.post("/Wishlist/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  const items = await addToWishList(userId, productId);
  res.send(items);
});

router.delete("/Wishlist/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  await removeFromWishList(userId, productId);
  res.send({ message: "ok" });
});

router.get("/carts", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const items = await getCartItems(userId);
  res.send(items);
});

router.post("/carts/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  const quantity = req.body.quantity;
  const items = await addToCart(userId, productId, quantity);
  res.send(items);
});

router.delete("/carts/:id", async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.id;
  await removeFromCart(userId, productId);
  res.send({ message: "ok" });
});

router.post("/order", async (req, res) => {
  const userId = req.user.id;
  const order = req.body;
  await addOrder(userId, order);
  await clearCart(userId);
  return res.send({
    message: "Order Placed",
  });
});

router.get("/orders", async (req, res) => {
  const userId = req.user.id;
  const orders = await getCustomerOrder(userId);
  return res.send(orders);
});
module.exports = router;
