import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProcuct from "../helper/fetchCategoryWiseProduct";
import displayCurrencyInd from "../helper/currnencyIND";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import addToCart from "../helper/addToCart";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import scrollTop from "../helper/scrollTop";

const categoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const [scroll,setScroll] = useState(0);
  const scrollEement = useRef()

  const {fetchUserAddToCartProduct} = useContext(Context);
  const handleAddtoCart = async(e,id)=>{
    await addToCart(e,id)
    await fetchUserAddToCartProduct();
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProcuct(category);
    setLoading(false);

    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = ()=>{
    scrollEement.current.scrollLeft += 300
  }
  const scrollLeft = ()=>{
    scrollEement.current.scrollLeft -= 300
  }
  
  return (
    <div className="container mx-auto px-3 my-2 relative">
      <h2 className="text-2xl font-normal py-2">{heading}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between  gap-3 md:gap-4 overflow-scroll scrollbar-none transition-all" >
        
        {
            loading ?(
                loadingList.map((product, index) => {
                    return (
                      <div className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-md" key={index}>
                        <div className="bg-slate-200 h-52 p-2 min-w-[280px] md:min-w-[145px] shadow-md  flex justify-center items-center animate-pulse "></div>
                        <div className="p-2 grid w-full gap-1">
                          <h2 className="font-sans text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-2 w-full rounded-md animate-pulse"></h2>
                          <p className=" capitalize text-sm text-slate-500 bg-slate-200 rounded-md animate-pulse"></p>
                          <div className="flex gap-2 w-full">
                            <p className="font-medium p-2 bg-slate-200 w-full rounded-md animate-pulse"></p>
                            <p className="text-slate-500 p-2 line-through bg-slate-200 w-full rounded-md animate-pulse"></p>
                          </div>
                          <button className="text-sm  text-white px-2 py-2 rounded-full mt-3 w-full bg-slate-200 animate-pulse"></button>
                        </div>
                      </div>
                    );
                  })
            ):(
                data.map((product, index) => {
                    return (
                      <Link to={"/product/"+product?._id} className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-md " 
                      key={index}
                      onClick={scrollTop}>
                        <div className="bg-slate-200 h-52 p-2 min-w-[280px] md:min-w-[145px] shadow-md  flex justify-center items-center">
                          <img
                            src={product?.productImage[0]}
                            alt=""
                            className="object-scale-down h-full p-3 hover:scale-110 transition-all mix-blend-multiply"
                          />
                        </div>
                        <div className="p-2 grid">
                          <h2 className="font-sans text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                            {product?.productName}
                          </h2>
                          <p className=" capitalize text-sm text-slate-500">
                            {product?.category}
                          </p>
                          <div className="flex gap-2">
                            <p className="font-medium">
                              {displayCurrencyInd(product?.sellingPrice)}
                            </p>
                            <p className="text-slate-500 line-through">
                              {displayCurrencyInd(product?.productPrice)}
                            </p>
                          </div>
                          <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full mt-3 w-full"
                          onClick={(e)=>handleAddtoCart(e,product?._id)}>
                            Add Cart
                          </button>
                        </div>
                      </Link>
                    );
                  })
            )
        }
       
      </div>
    </div>
  );
};

export default categoryWiseProductDisplay;
