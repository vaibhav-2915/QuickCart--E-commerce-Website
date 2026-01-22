const userModel = require("../../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const login = async (req,res)=>{
    try{
        const { email,password} = req.body;
        if(!email){
            throw new Error("Email is required for login");
        }
        if(!password){
            throw new Error("Password is required");
        }
        const user = await userModel.findOne({email});
        if(!user){
            throw new Error("invalid Email ");
        }
       
        const checkPassword = bcrypt.compareSync(password, user.password); // true


        if(checkPassword){
            const tokenData ={
                id:user._id,
                email:user.email,

            }
            console.log("token: ",tokenData)
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *24 });
            const tokenOption ={
                httpOnly:true,
                secure:true,
                sameSite:"none",
            }
            res.cookie("token",token,tokenOption).status(200).json({
                message:"login successfully",
                data:token,
                error:false,
                success:true,
            })

        }else{
            throw new Error("invalid Password");
        }
    }catch(err){
        console.log(err.message)
        res.json({
            message:err.message ||true,
            error:true,
            success:false,
        })
}
}
module.exports = login;