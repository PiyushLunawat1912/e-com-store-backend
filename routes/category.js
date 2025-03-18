const express = require("express");
const router = express.Router();
  const Category = require("./../db/category");
const { addCategory, updaterCategory , deleteCategory,getCategories,getCategoriesById } = require("../handlers/category-handler");
 router.post("",async(req,res)=>{
 let model = req.body;  
  let result = await addCategory(model)
      res.send(result); 
 });

 router.get("",async(req,res)=>{

   let result = await getCategories()
       res.send(result); 
  });

  router.get("/:id",async(req,res)=>{
    let id= req.params["id"];
    let result = await getCategoriesById(id)
        res.send(result); 
   });

 router.put("/:id",async(req,res)=>{
    console.log("here");
    
    let model = req.body; 
    let id= req.params["id"];
  await updaterCategory(id,model);
  res.send({ message:"Updated"})

 });


 router.delete("/:id",async(req,res)=>{
let id= req.params["id"];
 await deleteCategory(id);
res.send({ message:"Deleted"})

});

 module.exports = router;


