const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({
    productId:{
        type:String,
        ref:"Product",
    },
    quantity:Number,
    userId:String,
},{
    timestamps:true,
})

const cartProductModel = new mongoose.model("CartProduct",cartProductSchema)

module.exports = cartProductModel;