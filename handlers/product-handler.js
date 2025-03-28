const Product = require("./../db/product");

//  ADD
async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

// Update

async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
}

//   Delete

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

//     Get All Products

async function getAllProducts() {
  let products = await Product.find();
  return products.map((x) => x.toObject());
}

//    Get  Particular  Product

async function getProduct(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

async function getNewProducts() {
  let newProducts = await Product.find({
    isNewProduct: true,
  });
  return newProducts.map((x) => x.toObject());
}

async function getFeaturedProducts() {
  let featuredProducts = await Product.find({
    isFeatured: true,
  });
  return featuredProducts.map((x) => x.toObject());
}

async function getProductForListing(
  searchTerm,
  categoryId,
  brandId,
  page,
  pageSize,
  sortBy,
  sortOrder
) {
  if (!sortBy) {
    sortBy = "price";
  }

  // ✅ Ensure sortOrder is either 1 or -1
  if (sortOrder !== 1 && sortOrder !== -1) {
    sortOrder = -1; // Default to descending
  }

  let queryFilter = {};
  if (searchTerm) {
    queryFilter.$or = [
      { name: { $regex: ".*" + searchTerm + ".*", $options: "i" } }, // ✅ Case insensitive search
      { shortDescription: { $regex: ".*" + searchTerm + ".*", $options: "i" } },
    ];
  }

  if (categoryId) {
    queryFilter.categoryId = {
      $in: Array.isArray(categoryId) ? categoryId : [categoryId],
    };
  }

  if (brandId) {
    queryFilter.brandId = brandId;
  }

  console.log("Query Filter:", queryFilter); // ✅ Debugging log

  const products = await Product.find(queryFilter)
    .sort({ [sortBy]: +sortOrder }) // ✅ Correct sorting
    .skip((+page - 1) * pageSize)
    .limit(+pageSize);

  return products.map((x) => x.toObject());
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getNewProducts,
  getFeaturedProducts,
  getProductForListing,
};
