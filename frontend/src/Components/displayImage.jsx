import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const displayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed flex justify-center items-center top-0 bottom-0 right-0 left-0  ">
      <div className="bg-white shadow-lg rounded max-w-4xl mx-auto p-3">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 pb-3 cursor-pointer "
          onClick={onClose}
        >
          <IoCloseOutline />
        </div>
        <div className="flex justify-center p-3 max-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default displayImage;
