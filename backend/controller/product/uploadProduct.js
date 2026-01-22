const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helper/permission")

const uploadProduct = async (req,res)=>{
    try{

        const sessionUserId = req.userId;
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission Denied");
        }

        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        if(saveProduct){
            res.status(201).json({
                message:"Product Uploaded Successfullu",
                success:true,
                error:false,
                data:saveProduct,
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message || "Internal Server ERROR" ,
            error:true,
            success:false,
        })
    }
}

module.exports = uploadProduct;