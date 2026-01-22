import { toast } from "react-toastify";
import SummaryAPI from "../common/url";

const addToCart = async (e,id)=>{
    e.stopPropagation();
    e.preventDefault();

    const response = await fetch(SummaryAPI.addToCart.url,{
        method:SummaryAPI.addToCart.method,
        credentials:"include",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({
            productId : id
        })
    })
    console.log("Response:",response)
    const dataResponse = await response.json();
    console.log("Response:",dataResponse)

    if(dataResponse.success){
        toast.success(dataResponse.message)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }
    return dataResponse;
}
export default addToCart;