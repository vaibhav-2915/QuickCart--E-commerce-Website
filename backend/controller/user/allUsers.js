const userModel = require("../../models/user");
const allUsers = async (req,res)=>{
    try{
        const allUsers = await userModel.find({});
        res.status(200).json({
            data:allUsers,
            error:false,
            success:true,
            message:"All Users",
        })
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false,
        })
    }
}
module.exports =  allUsers;