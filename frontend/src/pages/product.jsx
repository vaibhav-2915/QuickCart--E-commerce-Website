import React, { useEffect, useState } from "react";
import UploadProduct from "../Components/uploadProduct.jsx";
import SummaryAPI from "../common/url.jsx";
import AdminProductCard from "../Components/adminProductCard.jsx";

export const Product = ()=>{
    const [openUploadProduct,setOpenUploadProduct] = useState(false);
    const [allProduct,setAllProduct] = useState([]);

    const fetchAllProduct = async()=>{
        const response = await fetch(SummaryAPI.allProduct.url,{
            method:"get",
            credentials:"include",
        })
        const dataResponse = await response.json(); 
        console.log(dataResponse);
        setAllProduct(dataResponse?.data || []);
    }

    useEffect(()=>{
        fetchAllProduct();
    },[])

    return(
         <div>
           <div className="bg-white px-3 py-2 flex justify-between items-center shadow-md">
            <h2 className="font-bold text-lg"> ALL PRODUCT</h2>
            <button 
            className="border-2 border-red-500  py-2 px-1 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all"
            onClick={()=>setOpenUploadProduct(true)}>
            Upload Product</button>
           </div>
           {/* All Product */}
           <div className="flex items-center flex-wrap gap-3 py-3 h-[calc(100vh-190px)] overflow-y-scroll">
                {
                    allProduct.map((product,index)=>{
                        return(
                            <AdminProductCard product={product} key={index+"allProduct"} fetchData={fetchAllProduct}/>
                           
                        )
                    })
                }
           </div>

           {/* Upload product */}
           { openUploadProduct && (
           <UploadProduct onClose={()=>setOpenUploadProduct(false)}
           fetchData={fetchAllProduct}/>
            )}
        </div>

    )
}
