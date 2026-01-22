const cartProductModel = require('../../models/cartProduct');
const updateAddToCartProduct = async (req, res) => {
    try{
        const curreUserId = req.userId;
        const addToCartProductId = req.body._id;

        const qty = req.body.quantity;

        const updateProduct = await cartProductModel.updateOne({_id:addToCartProductId},{
            ...(qty && {quantity: qty})
        })
        res.json({
            data:updateProduct,
            message:"Product updated successfully",
            success:true,
            error:false,
        })


    }catch(error){
        res.json({
            message:error.message,
            success:false,
            error:true,
        })
    }
}

module.exports = updateAddToCartProduct;