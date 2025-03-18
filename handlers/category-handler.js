  const Category = require("./../db/category");

//ADD Category
async function addCategory(model){
    let category = new Category({
        name:model.name
        });
         await category.save();
        return category.toObject();
}

async function getCategories(){
  let categories = await Category.find();
  return categories.map((c) =>c.toObject());
}


async function getCategoriesById(id){
  let category = await Category.findById(id);
  return category.toObject();
}
//UPDATE Category
async function updaterCategory(id,model){
    await Category.findOneAndUpdate({ _id:id},model)
     return;
}


//DELETE Category
async function deleteCategory(id){
    await Category.findByIdAndDelete (id);
     return;
}


module.exports ={addCategory, updaterCategory,deleteCategory,getCategories,getCategoriesById };