const productModel = require("../../models/productModel");

const getProduct = async (req,res)=>{
    try{
         
        const allProduct = await productModel.find({}).sort({createdAt:-1});

        res.json({
            message:"All Product",
            success:true,
            error:false,
            data:allProduct,
        })

    }catch(err){
        res.status(500).json({
            message:err.message || "Internal Server ERROR",
            error:true,
            success:false,
        })
    }
}

module.exports = getProduct;
