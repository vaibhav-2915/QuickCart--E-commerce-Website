import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import image1 from "../assest/banner/img2.webp";
import image2 from "../assest/banner/img5.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img1.webp";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.webp";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.jpg";
import image5Mobile from "../assest/banner/img5_mobile.png";

const bannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const destopImage = [image1, image2, image3, image4, image5];


  const mobileImage = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (destopImage.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const preveImage = () => {
    if (currentImage !== -5) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(()=>{
    const interval = setInterval(()=>{
        if (destopImage.length - 1 > currentImage){
            nextImage()
        }else{
            setCurrentImage(0)
        }
    },3000)
    return ()=> clearInterval(interval)
  },[currentImage])
  return (
    <div className="container mx-auto px-3 rounded-md overflow-hidden">
      <div className="bg-slate-200 h-52 md:h-72 w-full relative">
        <div className=" absolute z-10 w-full h-full md:flex items-center hidden">
          <div className="flex justify-between items-center w-full text-2xl text-white mx-2">
            <button
              className="hover:bg-white hover:rounded-full p-2  hover:text-slate-500"
              onClick={preveImage}
            >
              <FaAngleLeft />
            </button>
            <button
              className="hover:bg-white hover:rounded-full p-2   hover:text-slate-500"
              onClick={nextImage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        {/* desktop version and tablet version */}
        <div className="hidden md:flex h-full w-full">
          {destopImage.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt="image" className="w-full h-full" />
                
              </div>
            );
          })}
        </div>
        {/* mobile version */}
        <div className=" flex h-full w-full overflow-hidden md:hidden">
          {mobileImage.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} alt="image" className="w-full h-full object-cover" />
               
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default bannerProduct;
