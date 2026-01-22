const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        require:true,
    },
    brandName:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        required:true,
    },
    productImage:[],
    description:{
        type:String,
        require:true,
    },
    productPrice:{
        type:Number,
        require:true,
    },
    sellingPrice:{
        type:Number,
        require:true,
    }
},
{
    timestamps:true,    
});

const productModel = mongoose.model("Product",productSchema);

module.exports = productModel;