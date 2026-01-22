import React, {useState, useEffect } from 'react';
import SummaryAPI from '../common/url';
import { Link } from 'react-router-dom';

const categoryList = (req,res)=>{

    const [productCategory,setProductCategory]= useState([]);
    const [loading,setLoading] = useState(false);
    

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async()=>{
        setLoading(true)
        const response =  await fetch(SummaryAPI.category.url);
        const dataCategoryProduct = await response.json();
        setLoading(false)
        setProductCategory(dataCategoryProduct.data)
    }
    useEffect(()=>{
        fetchCategoryProduct();
    },[])
    return (
        <div className='container mx-auto p-3'>
            <div className='flex items-center justify-between gap-2 overflow-scroll scrollbar-none '>
            {
                loading ?(
                    categoryLoading.map((product,index)=>{
                        return(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={index}></div>
                        )
                    })
                ):
                (
                    productCategory.map((product,index)=>{
                        return(
                                <Link to={"/categoryProduct?category="+product?.category} className='cursor-pointer' key={index}>
                                
                                <div  className='w-16 h-16 md:w-20 md:h-20 rounded-full p-4 overflow-hidden bg-slate-200 flex items-center justify-center ' key={product?.category+index}>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'  />
                                </div>
                                <p  className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
            </div>

        </div>
    )
}

export default categoryList;
