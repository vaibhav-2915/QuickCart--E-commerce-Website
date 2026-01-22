const cartProductModel = require("../../models/cartProduct")
const deleteAddToCartProduct = async(req,res)=>{
    try{
        const addToCartProductId = req?.body?._id;

        const deleteProduct = await cartProductModel.deleteOne({_id:addToCartProductId});

        res.json({
            data:deleteAddToCartProduct,
            message:"Product remove",
            error:false,
            success:true
        })

    }catch(error){
        res.json({
            message:error?.message || error,
            success:false,
            error:true
        })
    }
}

module.exports = deleteAddToCartProduct