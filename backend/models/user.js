const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
    },
    confirmPassword:{
        type:String,
    },
    profilePic:{
        type:String,
    },
    role:{
        type:String,
    }
},
{
    timestamps:true,
})

const userModel = mongoose.model("User",userSchema);

module.exports  = userModel; 