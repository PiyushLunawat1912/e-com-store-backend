const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema=new mongoose.Schema({
    name:String,
    shortDescription:String,
    description :String,
    Price:String,
    discount:String,
    images:Array(String),
    categoryId:{ type: Schema.Types.ObjectId, ref: 'categories'},
    brandId:{ type: Schema.Types.ObjectId, ref: 'brands'}
});

const  Product =mongoose.model('Product', productSchema);
module.exports = Product;