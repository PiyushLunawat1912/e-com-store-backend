const mongoose = require("mongoose");

const Product = require("./db/product.js"); // Adjust the path based on your project structure

// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017/e-com-store", {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

async function updateSchema() {
  try {
    const products = await Product.find(); // Fetch all products

    for (let product of products) {
      product.Price = parseFloat(product.Price) || 0; // Convert Price to Number

      product.discount = parseFloat(product.discount) || 0; // Convert discount to Number

      await product.save(); // Save updated document

      console.log(`Updated product: ${product._id}`);
      node;
    }

    console.log("Schema updated successfully!");
  } catch (error) {
    console.error("Error updating schema:", error);
  } finally {
    mongoose.disconnect(); // Close connection
  }
}

updateSchema();
