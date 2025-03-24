 const Product  = require("./../db/product");

 
//  ADD
 async function addProduct(model){
    let product = new Product({
         ...model
    })
    await product.save();
    return product.toObject();
 }

  // Update

  async function updateProduct(id,model) {
    await Product.findByIdAndUpdate(id,model);
  }

//   Delete

  async function deleteProduct(id) {
    await Product.findByIdAndDelete(id);
  }

//     Get All Products 

async function getAllProducts() {
    let products = await Product.find()
    return products.map((x)=>x.toObject());
}


//    Get  Particular  Product

async function getProduct(id) {
    let product = await Product.findById(id);
    return product.toObject();
}


              
module.exports ={addProduct, updateProduct,deleteProduct,getAllProducts,getProduct };