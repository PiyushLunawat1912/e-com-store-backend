const Brand = require("./../db/brand");


async function getBrands(){
let brands = await Brand.find();
return brands.map(x=> x.toObject());

}


async function getBrand(_id){
    let brand = await Brand.findById(_id);
    return brand.toObject();
    
    }

async function addBrand(model){
    let brand = new Brand({
        name:model.name
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(_id,model){
await Brand.findByIdAndUpdate(_id,model)
}


async function deleteBrand(_id,){
    await Brand.findByIdAndDelete(_id,)
    }

    module.exports ={getBrands,getBrand,addBrand,updateBrand,deleteBrand }