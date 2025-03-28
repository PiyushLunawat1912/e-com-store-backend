const express = require("express");
const router = express.Router();
const { getNewProducts } = require("../handlers/product-handler");
const { getFeaturedProducts } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const { getProductForListing } = require("../handlers/product-handler");
const { getBrands } = require("../handlers/brand-handler");

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
module.exports = router;
