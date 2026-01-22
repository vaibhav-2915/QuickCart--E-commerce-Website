const userModel = require("../../models/user");
const updateUserRole = (async(req,res)=>{
    try{
        const {userId,username,email,role} = req.body;

        const sessionUser = req.userId;
        console.log("body:",req.body)

        const payload = {
        ...(email && {email}),
        ...(username && {username}),
        ...(role && {role}),
    }
    console.log("payload:",payload);
    const user = await userModel.findById(sessionUser);
    console.log("userRole:",user.role);

    const userUpdate = await userModel.findByIdAndUpdate(userId,payload,{new:true});
    console.log("userUpdate:",userUpdate);
    
    res.json({
        data:userUpdate,
        message:"User role is updated successfully",
        error:false,
        success:true,
    })

    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false,
        })
    }
})

module.exports = updateUserRole;