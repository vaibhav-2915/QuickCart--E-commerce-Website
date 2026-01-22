const orderModel = require('../../models/orderProduct');
const Order = async (req,res)=>{
    try{

        const currUserId = req.userId;
        const orderList = await orderModel.find({userId:currUserId}).sort({createdAt:-1});

        res.status(200).json({
            message:"Order List",
            data:orderList,
            success:true,
            error:false,
        });
    }catch(error){
        res.status(500).json({
            message:error.message,
            error:true,
            success:false
        })
    }

}
module.exports = Order;