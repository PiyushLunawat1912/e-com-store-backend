const express = require("express");
const mongoose=require ("mongoose");
const app = express();
const port = 3000;
const cors = require("cors")
const categoryRoutes =require("./routes/category")
const brandRoutes =require("./routes/brand")
const productRoutes = require("./routes/product")
const customerRoutes = require("./routes/customer")
const authRoutes = require("./routes/auth")

app.get("/",(req,res)=>{
    res.send("Server running")
});

app.use(cors());
app.use(express.json());
app.use("/category",categoryRoutes);
app.use("/brand",brandRoutes);
app.use("/product",productRoutes);
app.use("/customer",customerRoutes);
app.use("/auth",authRoutes)
async function connectDb() {
   await mongoose.connect("mongodb://localhost:27017",{
    dbName: "e-com-store-db"
});
console.log("mongoDb connected");

}
connectDb().catch((err)=>{
    console.log(err);
    
});
app.listen(port,()=>{
    console.log("Server running on port",port);
    
})