const express = require("express");
const mongoose=require("mongoose");
const app = express();
const port = 3000;
const categoryRoutes =require("./routes/category")
app.get("/",(req,res)=>{
    res.send("Server running")
});

app.use(express.json());
app.use("/category",categoryRoutes);
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