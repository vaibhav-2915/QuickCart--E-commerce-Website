import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryAPI from "../common/url";
import displayCurrencyInd from "../helper/currnencyIND";
import { FaStar, FaStarHalf } from "react-icons/fa";

import CategoryWiseProductDisplay from "../Components/categoryWiseProduct";
import addToCart from "../helper/addToCart";
import Context from "../context/Context";

const productDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    productPrice: "",
    sellingPrice: "",
  });
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(false);
  const productImageList = new Array(4).fill(null);
  const params = useParams();
  const navigate = useNavigate();
  const [zoomImage, setZoomImage] = useState(false);

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    y: 0,
    x: 0,
  });

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.getProductDetails.url, {
      method: SummaryAPI.getProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });

    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  const handleMouseEnterProduct = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handlZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleZoomOutImage = ()=>{
    setZoomImage(false);
  }
  const {fetchUserAddToCartProduct} = useContext(Context)

  const handleAddtoCart = async(e,id)=>{
    await addToCart(e,id);
    await fetchUserAddToCartProduct()
  }
  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id);
    await fetchUserAddToCartProduct()
    navigate("/cart")
  }

  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  return (
    <div className="container mx-auto p-3 ">
      <div className="min-h-200px flex flex-col lg:flex-row gap-2 ">
        {/* Product Image */}
        <div className="h-96 flex flex-col  lg:flex-row-reverse gap-3 mb-20 ">
          {/* Full image */}
          {loading ? (
            <div>
              <div className="lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 p-2 animate-pulse"></div>

              <div className=" hidden lg:flex gap-8 mt-10 justify-center items-center ">
                <button className="border-2 bg-slate-200  text-lg min-w-[120px] rounded-full px-6 py-4 font-medium animate-pulse ">
                  {" "}
                </button>
                <button className="border-2 bg-slate-200  text-white text-lg  rounded-full min-w-[120px] px-6 py-4 font-medium animate-pulse "></button>
              </div>
            </div>
          ) : (
            <div className="w-96">
              <div className="lg:h-96 lg:w-96 h-[300px] w-[300px] bg-slate-200 p-2 ">
                <img
                  src={activeImage}
                  alt="product image"
                  className="object-scale-down h-full w-full mix-blend-multiply"
                  onMouseMove={handlZoomImage}
                  onMouseLeave={handleZoomOutImage}
                />

                {zoomImage && (
                  <div className="hidden lg:block absolute min-w-[450px] min-h-[400px] bg-slate-200 overflow-hidden  right-[300px] top-[35px] m-10  ">
                    <div
                      className="w-full h-full  mix-blend-multiply min-h-[385px] min-w-[400px] scale-110"
                      style={{
                        background: `url(${activeImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                          zoomImageCoordinate.y * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="hidden lg:flex gap-8 mt-10 justify-center items-center ">
                <button className="border-2 hover:bg-red-500 text-red-500 hover:text-white text-lg min-w-[120px] border-red-500 rounded-full px-6 py-1 font-medium"
                onClick={(e)=>handleBuyProduct(e,data?._id)}>
                  Buy{" "}
                </button>
                <button className="border-2 border-red-500 bg-red-500 hover:text-red-500 hover:bg-white text-white text-lg  rounded-full min-w-[120px] px-6 py-1 font-medium"
                 onClick={(e)=>handleAddtoCart(e,data?._id)}>
                  Add to cart
                </button>
              </div>
            </div>
          )}

          {/* Single Image */}
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageList.map((product, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 p-2 rounded-md animate-pulse "
                      key={index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full" key={data.category}>
              {
                data.productImage.map((imgUrl, index) => {
                  return (
                    <div>
                      <div
                        className="h-20 w-20 bg-slate-200 p-1 rounded-md hover:border-2 hover:border-red-500 transition-all cursor-pointer"
                        key={imgUrl + index}
                      >
                        <img
                          src={imgUrl}
                          alt=""
                          className="w-full h-full hover:scale-95 object-scale-down mix-blend-multiply  rounded-md transition-all"
                          onMouseMove={() => {
                            handleMouseEnterProduct(imgUrl);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
         </div>
         {/* /details */}

         {loading ? (
          <div className=" w-full gap-1 mt-2 lg:mt-0">
            <p className="bg-gray-200 font-semibold text-gray-700 rounded-md  h-5 lg:h-8 w-full animate-pulse "></p>
            <h2 className="font-medium text-2xl lg:text-4xl bg-slate-200 rounded-md my-2 h-10 w-full animate-pulse"></h2>
            <p className="capitalize text-xl lg:h-8 text-slate-600 font-mono  rounded-lg bg-slate-200 animate-pulse h-5"></p>
            <div className="flex text-xl text-slate-200 animate-pulse mt-2">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <div className="flex gap-4 bg-slate-200 h-5 lg:h-8 mt-2 animate-pulse  rounded-lg">
              <p className="text-lg lg:text-xl font-semibold   "></p>
              <p className="text-lg lg:text-xl font-semibold text-slate-600 line-through "></p>
            </div>
            <div className="lg:hidden flex gap-2 my-2 w-full">
              <button className="border-2 h-6 w-10  bg-slate-200  rounded-full px-12 py-5 font-medium">
                {" "}
              </button>
              <button className="border-2   text-white text-lg bg-slate-200 rounded-full  px-16 py-5 font-medium"></button>
            </div>
            <div className="w-full bg-slate-200 h-6 lg:h-8 mt-3 rounded-lg  "></div>
          </div>
         ) : (
          <div className="gap-2 mt-2 lg:mt-0">
            <p className="bg-gray-200 font-semibold text-gray-700 rounded-md w-fit px-2">
              {data?.brandName}
            </p>
            <h2 className="font-medium text-2xl lg:text-4xl ">
              {data.productName}
            </h2>
            <p className="capitalize text-xl text-slate-600 font-mono">
              {data?.category}
            </p>
            <div className="flex text-xl text-red-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex gap-4">
              <p className="text-lg lg:text-xl font-semibold  ">
                {displayCurrencyInd(data.sellingPrice)}
              </p>
              <p className="text-lg lg:text-xl font-semibold text-slate-600 line-through ">
                {displayCurrencyInd(data?.productPrice)}
              </p>
            </div>
            <div className="lg:hidden flex gap-2 my-2">
              <button className="border-2 hover:bg-red-500 text-red-500 hover:text-white text-lg border-red-500 rounded-full px-6 py-1 font-medium"
               onClick={(e)=>handleBuyProduct(e,data?._id)}>
                Buy{" "}
              </button>
              <button className="border-2 border-red-500 bg-red-500 hover:text-red-500 hover:bg-white text-white text-lg  rounded-full px-6 py-1 font-medium"
              onClick={(e)=>handleAddtoCart(e,data?._id)}>
                Add to cart
              </button>
            </div>
            <div className="w-full">
              <p className="text-lg mt-4 font-semibold text-slate-500">
                Discription:
              </p>
              <p className="font-serif overflow-scroll scrollbar-none">
                {data.description}
              </p>
            </div>
          </div>
         )}
      </div>
      {
        data?.category && (
            <CategoryWiseProductDisplay category={data?.category} heading={"Recommendation Product"}/>
        )
      }
    </div>
  );
};

export default productDetails;
