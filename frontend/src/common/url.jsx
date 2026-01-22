
const backendDomin= import.meta.env.VITE_BACKEND_URL //"http://localhost:8080" 
console.log("backendDomin:",backendDomin)

const SummaryAPI = {
    SignUP:{
        url:`${backendDomin}/api/signup`,
        method: "POST",
    },
    LogIn:{
        url:`${backendDomin}/api/login`,
        method:"POST",
    },
    currDetails:{
        url:`${backendDomin}/api/userDetails`,
        method:"GET",
    },
    userLogOut:{
        url:`${backendDomin}/api/logout`,
        method:"GET",
    },
    allUsers:{
        url:`${backendDomin}/api/allUser`,
        method:"GET",
    },
    updateUserRole:{
        url:`${backendDomin}/api/userUpdate`,
        method:"POST",
    },
    uploadProduct:{
        url:`${backendDomin}/api/uploadProduct`,
        method:"POST",
    },
    allProduct:{
        url:`${backendDomin}/api/displayProduct`,
        method:"GET",
    },
    updateProduct:{
        url:`${backendDomin}/api/updateProduct`,
        method:"POST",
    },
    category:{
        url:`${backendDomin}/api/productCategory`,
        method:"GET"
    },
    getCategoryWiseProduct:{
        url:`${backendDomin}/api/getCategoryWiseProduct`,
        method:"POST",
    },
    getProductDetails:{
        url:`${backendDomin}/api/getProductDetails`,
        method:"POST",
    },
    addToCart:{
        url:`${backendDomin}/api/addToCart`,
        method:"POST",
    },
    countAddToCartProduct:{
        url:`${backendDomin}/api/countAddToCartProduct`,
        method:"GET",
    },
    viewCartProduct:{
        url:`${backendDomin}/api/viewCartProduct`,
        method:"GET"
    },
    updateAddToCartProduct:{
        url:`${backendDomin}/api/updateAddToCartProduct`,
        method:"POST",
    },
    deleteAddToCartProduct:{
        url:`${backendDomin}/api/deleteAddToCartProduct`,
        method:"POST",
    },
    searchProduct:{
        url:`${backendDomin}/api/search`,
        method:"GET",
    },
    filterProduct:{
        url:`${backendDomin}/api/filterProduct`,
        method:"POST"
    },
    payment:{
        url:`${backendDomin}/api/checkout`,
        method:"POST",
    },
    order:{
        url:`${backendDomin}/api/order`,
        method:"GET",
    }
}


export default SummaryAPI;

