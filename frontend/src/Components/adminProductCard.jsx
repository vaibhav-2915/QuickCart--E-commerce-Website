import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { useState } from "react";
import AdminEditProduct from "./adminEditProductCard";
import displayCurrencyInd from "../helper/currnencyIND";


const adminProductCard = ({
    product,
    fetchData
})=>{
    const [editProduct ,setEditProduct] = useState(false);
    return(
    <div className="bg-white p-6 rounded shadow-lg group h-64   ">
       <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center  ">
        <img src={product.productImage[0]} alt="img" width={120} height={120} className="object-fill mx-auto h-full"/>
        </div>
        <p className="ml-2 text-ellipsis line-clamp-2">{product.productName}</p>
        <div>
            <p className="font-semibold ml-2">
                {displayCurrencyInd(product.productPrice)}
            </p>
        <div className="w-fit ml-auto p-2 hidden group-hover:block hover:bg-slate-100 rounded-full cursor-pointer "
        onClick={()=>setEditProduct(true)}>
        <MdOutlineModeEdit />
        </div>
        </div>
       </div>
        {
            editProduct &&(
                <AdminEditProduct 
                product={product}
                onClose={()=>setEditProduct(false)}
                fetchData={fetchData}/>
            )
        }
    </div>
    )
}

export default adminProductCard;