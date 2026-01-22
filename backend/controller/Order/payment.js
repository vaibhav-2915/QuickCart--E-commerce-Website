const stripe = require('../../config/stripe');
const userModel = require('../../models/user');

const payment = async(req,res)=>{
    try{
        const {cardItems} = req.body;
       console.log("image:",cardItems[0].productId.productImage[0])
        const user = await userModel.findOne({_id:req.userId});
        const params = {
            submit_type:'pay',
            mode:'payment',
            payment_method_types:['card'],
            billing_address_collection:'auto',
            shipping_options:[
                {
                    shipping_rate:'shr_1PTS0OP2ZbVyws6bZDr5rtAy'
                }
            ],
            customer_email:user.email,
            metadata:{
                userId:req.userId,
            },
            line_items: cardItems.map((item,index)=>{
                return{
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata:{
                                productId:item.productId._id
                            },  
                        },
                        unit_amount:item.productId.sellingPrice * 100,
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1,
                    },
                    quantity:item.quantity,
                }
            }),
            success_url:`${process.env.FRONTEND_URL}/success`,
            cancel_url:`${process.env.FRONTEND_URL}/cancel`,
        
        }
        // console.log("params:",params)
        const session = await stripe.checkout.sessions.create(params)
        res.status(303).json(session)

    }catch(error){
        res.status(500).json({
            message:error?.message ||error || "Payment Failed! Server Error!",
            success:false,
            error:true,

        })
    }
}

module.exports = payment;