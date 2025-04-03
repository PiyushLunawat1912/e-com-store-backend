const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use(cors());
app.use(express.json());
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/orders", verifyToken, isAdmin, orderRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);
async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "e-com-store-db",
  });
  console.log("mongoDb connected");
}
connectDb().catch((err) => {
  console.log(err);
});
app.listen(port, () => {
  console.log("Server running on port", port);
});
