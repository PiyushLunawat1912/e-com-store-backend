  const Category = require("./../db/category");

//ADD Category
async function addCategory(model){
    let category = new Category({
        name:model.name
        });
         await category.save();
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


module.exports ={addCategory, updaterCategory,deleteCategory };