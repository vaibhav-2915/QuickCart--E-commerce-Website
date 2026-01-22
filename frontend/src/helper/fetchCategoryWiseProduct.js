// const SummaryAPI  = require("../common/url")
import SummaryAPI from "../common/url"

const fetchCategoryWiseProcuct = async (category)=>{
    const response = await fetch(SummaryAPI.getCategoryWiseProduct.url,{
        method:SummaryAPI.getCategoryWiseProduct.method,
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify({category})
    })
    const dataResponse = await response.json();
    return dataResponse;
}

export default fetchCategoryWiseProcuct;