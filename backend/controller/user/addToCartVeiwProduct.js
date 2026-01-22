const cartProductModel = require("../../models/cartProduct");

const addToCartViewProduct = async(req,res)=>{
    try{
        const currUserId = req.userId;
        
        const allProduct = await cartProductModel.find({
            userId:currUserId
        }).populate("productId")
        res.json({
            success:true,
            error:false,
            data:allProduct,
        })
    }catch(error){
        res.status(500).json({
            message:error.message,
            error:true,
            success:false,
        })
    }
}

module.exports = addToCartViewProduct;