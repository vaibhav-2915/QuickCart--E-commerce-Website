import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import DisplayImage from "../Components/displayImage";
import productCategory from "../helper/poductCategory";
import uploadImage from "../helper/uploadImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import SummaryAPI from "../common/url";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose ,fetchData}) => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productPrice: "",
    productImage: [],
    category: "",
    description: "",
    brandName: "",
    sellingPrice: "",
  });
  const [onFullScreenImage, setOnFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (e) => {
    const imgFile = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(imgFile);
    setProductDetails((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteImage = async (index) => {
    console.log("index", index.index);
    const newProductImage = [...productDetails.productImage];
    newProductImage.splice(index.index, 1);
    setProductDetails((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
    console.log("newProductImage", newProductImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchProduct = await fetch(SummaryAPI.uploadProduct.url,{
      method:SummaryAPI.uploadProduct.method,
      headers:{
        "Content-type":"application/json",
      },
      credentials:"include",
      body:JSON.stringify(productDetails),
    })

    const responseData = await fetchProduct.json();

    if(responseData.success){
      toast.success(responseData.message);
      onClose();
      fetchData();
    }
    if(responseData.error){
      toast.error(responseData.message)
    }
    console.log("responseData",responseData);

   };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-1 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-start">
          <h2 className="font-bold">Upload Product</h2>
          <div
            className="block ml-auto text-2xl hover:text-red-600 pb-3"
            onClick={onClose}
          >
            <IoCloseOutline />
          </div>
        </div>
        <form
          className="grid p-3 gap-2 overflow-scroll h-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter Product Name"
            value={productDetails.productName}
            onChange={handleOnChange}
            className="p-1 border-2 border-slate-100 rounded-md"
            required
          />
          <label htmlFor="brandName " className="mt-1">
            Brand Name:
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter Brand Name"
            value={productDetails.brandName}
            onChange={handleOnChange}
            className="p-1 border-2 border-slate-100 rounded-md"
            required
          />
          <label htmlFor="category" className="mt-1">
            Category
          </label>
          <select
            className="bg-slate-100 h-8"
            name="category"
            id="category"
            value={productDetails.category}
            onChange={handleOnChange}
            
          >
            <option value={""}>Select Category</option>
            {productCategory.map((category, index) => {
              return (
                <option key={index} value={category.value}>
                  {category.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-1">
            {" "}
            Product Image
          </label>
          <label htmlFor="uploadImg">
            <div
              id="productImage"
              className="bg-slate-100 p-2 h-44 w-full rounded-md flex justify-center items-center"
            >
              <div className="text-slate-500 flex justify-center items-center flex-col ">
                <span className="text-5xl">
                  <FaCloudUploadAlt />
                </span>
                <p>Upload Image</p>
                <input
                  type="file"
                  id="uploadImg"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {productDetails?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {productDetails.productImage.map((image, index) => {
                  return (
                    <div className="relative  group object-cover ">
                      <img
                        src={image}
                        width={100}
                        height={90}
                        className="bg-slate-100 cursor-pointer border h-52 w-32 object-scale-down p-2"
                        onClick={() => {
                          setOnFullScreenImage(true);
                          setFullScreenImage(image);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 cursor-pointer hidden group-hover:block"
                        onClick={() => handleDeleteImage({ index })}
                      >
                        <MdOutlineDeleteOutline />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="italic text-red-500 text-sm">
                *Please upload product image
              </p>
            )}
          </div>

          <label htmlFor="productPrice " className="mt-1">
            Price:
          </label>
          <input
            type="number"
            id="productPrice"
            name="productPrice"
            placeholder="Enter Price"
            value={productDetails.productPrice}
            onChange={handleOnChange}
            className="p-1 border-2 border-slate-100 rounded-md"
            required
          />
          <label htmlFor="sellingPrice " className="mt-1">
            Selling Price:
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Price"
            value={productDetails.sellingPrice}
            onChange={handleOnChange}
            className="p-1 border-2 border-slate-100 rounded-md"
            required
          />
          <label htmlFor="description" className="mt-1">
            Description:
          </label>
          <textarea
            name="description"
            value={productDetails.description}
            id="description"
            rows={5}
            className="h-28 rounded-md border resize-none p-2 bg-slate-100"
            onChange={handleOnChange}
            required
          ></textarea>

          <button className="text-white bg-red-500 rounded-md hover:bg-red-600 mt-2 mb-3 h-8">
            Upload Image
          </button>
        </form>
      </div>

      {/* display Image */}
      {onFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => {
            setOnFullScreenImage(false);
          }}
        />
      )}
    </div>
  );
};
export default UploadProduct;
