const userModel = require("../../models/user");
const bcrypt = require('bcryptjs');

const Signup = ( async (req,res)=>{
    try{
        const {username, email, password,confirmPassword} = req.body;

        
        const user = await userModel.findOne({username});   // Check if user is already exist   
        if (user){
            throw new Error("User is already exist");
        }

        
        
        if(!username){
            throw new Error("Username is required");
        }
        if(!email){
            throw new Error("Email is required");
        }
        if(!password){
            throw new Error("Password is required")
        }
        if(!confirmPassword){
            throw new Error("Confirm Password is required")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const hashConfirmPassword = bcrypt.hashSync(confirmPassword, salt);

        if(!hashPassword){
            throw new Error("Password is not hashed");
        }
        if(!hashConfirmPassword){
            throw new Error("Password is not hashed");
        }
        const payload = {           // Prepare user data
            ...req.body,
            role:"GENERAL",
            password:hashPassword,
            confirmPassword:hashConfirmPassword,
        }
        console.log(payload);

        const userData = new userModel(payload);   
        const saveData = await userData.save();

        if(!saveData){
            throw new Error("Data is not saved");
        }
        res.status(201).json({      // Respond with success message
            data:saveData,
            sucess:true,
            error:false,
            message:"User is created successfully"
        })
    }catch(err){
        console.log(err.message);
        res.json({
            message:err.message ||true,
            error:true,
            success:false,
        })
    }
})
module.exports = Signup;  // Export the Signup function