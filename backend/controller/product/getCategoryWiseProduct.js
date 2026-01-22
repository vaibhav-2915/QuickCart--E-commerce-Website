const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const {category} = req.body;
        const product = await productModel.find({category});
        
        res.json({
            data:product,
            message:"Category wise product",
            success:true,
            error:false,
        })
    }catch(error){
        console.log("this is error",error);
        res.status(500).json({
            message:error.message,
            error:true,
            success:false,
        })
    }
}

module.exports = getCategoryWiseProduct