const productModel = require('../../models/productModel');
const uploadProductPermission = require('../../helper/permission');

const updateProduct = async(req,res)=>{
    if(!uploadProductPermission){
        throw new Error("Permission denied");
    }
    const {_id,...resbody} = req.body;
    const product = await productModel.findByIdAndUpdate(_id,resbody)

    res.json({
        data:product,
        message:"Product Update",
        error:false,
        success:true,
    })

}
module.exports = updateProduct;