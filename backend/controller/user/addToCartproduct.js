const cartProductModel = require('../../models/cartProduct');

const addToCart = async(req,res)=>{
    try{
        const {productId} = req.body;
        const currentUser = req.userId;
        const isAlreadyAdded = await cartProductModel.findOne({productId:productId , userId:currentUser})
        
        if(isAlreadyAdded){
            return res.json({
                message:"Product already added to cart",
                success:true,
                error:false,
            })
        }
        const payload = {
            productId:productId,
            quantity:1,
            userId:currentUser,
        }

        const newCartProduct = new cartProductModel(payload);
        await newCartProduct.save();

        return res.json({
            data:newCartProduct,    
            message:"Product added to cart",
            success:true,
            error:false,
        })


    }catch(error){
        res.json({
            message: error.message || "Something went wrong",
            error:true,
            success:false,
        })
    }
}

module.exports = addToCart