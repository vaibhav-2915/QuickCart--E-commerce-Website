const userLogOut = (req,res)=>{
    try{
        res.clearCookie("token");
        res.json({
            message:"Successfully Log Out",
            error:false,
            success:true,
            data:[],
        })
        
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false,

        })
    }
}

module.exports = userLogOut;