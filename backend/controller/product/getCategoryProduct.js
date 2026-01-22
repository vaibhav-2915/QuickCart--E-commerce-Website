const productModel = require("../../models/productModel");

const getCategoryProduct = async (req,res) =>{
    try{
        const productCategory = await productModel.distinct("category");
        // console.log("product:",productCategory);

        const productByCategory = [];
        for(const category of productCategory){
            const product  = await productModel.findOne({category:category});
            if(product){
                productByCategory.push(product);
            }
        }
        res.status(200).json({
            message:"Product by category",
            data:productByCategory,
            error:false,
            success:true,
        })
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false,
        })
    }
}

module.exports = getCategoryProduct;