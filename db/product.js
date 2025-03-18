const mongoose = require("mongoose");

const productSchema=new mongoose.Schema({
    name:String,
    shortDescription:String,
    description :String,
    purchasePrice:String,
    sellingPrice:String,
    images:Array(String),
    categoryId:{ type: Schema.Types.ObjectId, ref: 'categories'}
});

const  Product =mongoose.model('Product', productSchema);
module.exports = Product;