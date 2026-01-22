import React from "react";
import LoginImg from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import SummaryAPI from "../common/url";
import {  toast } from 'react-toastify';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    if (data.password === data.confirmPassword) {

      try{
        const dataResponse = await fetch(SummaryAPI.SignUP.url, {
          method: SummaryAPI.SignUP.method,
          headers: {
            "content-type": "application/json", // Specify the content type of the request body
          },
          body: JSON.stringify(data), // Convert the data object to a JSON string
        });
        const dataAPI = await dataResponse.json(); // Send the request to the server
        if(dataAPI.sucess){
          toast.success(dataAPI.message);
          navigate("/Login");
        }
        if(dataAPI.error){
          toast.error(dataAPI.message)
        }
      }catch(error){
        console.log(error.message)
      }
      }
      else{
      toast.error("Password does not match")
    }
  };
  const handleUploadImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const uploadImg = await imageToBase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: uploadImg,
      };
    });
    // console.log(e.target.files[0])
  };

  return (
    <section id="Signup">
      <div className="mx-auto container px-4 mt-6">
        <div className="bg-white p-2 py-4 w-full max-w-lg mx-auto  ">
          <div className="w-24 h-15 mx-auto relative overflow-hidden rounded-full">
            <div className="bg-contain"> 
              <img
                src={data.profilePic || LoginImg}
                alt="login"
                className="rounded-md bg-cover"
              />
            </div>
            <form>
              <label htmlFor="fileUpload">
                <div className="text-sm text-center w-full bg-opacity-80 pb-4  pt-1 bg-slate-200 absolute bottom-0 cursor-pointer">
                  Upload Image
                </div>
              </label>
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={handleUploadImage}
              />
            </form>
          </div>
          <form className="pt-6 px-2 flex flex-col" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="username">Username</label>
              <div className="bg-slate-100 p-2">
                <input
                  id="username"
                  type="text"
                  value={data.username}
                  name="username"
                  onChange={handleOnChange}
                  placeholder="Username"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label htmlFor="Email">Email</label>
              <div className="bg-slate-100 p-2">
                <input
                  id="Email"
                  type="text"
                  value={data.email}
                  name="email"
                  onChange={handleOnChange}
                  placeholder="eg@gmail.com"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="Password">Password</label>
              <div className="bg-slate-100 p-2 flex justify-center">
                <input
                  id="Password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  placeholder="Password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={handleShowPassword}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              {/* <Link to={"ForgetPassword"} className="block w-fit ml-auto  hover:underline hover:text-red-400"> Forget Password</Link> */}
            </div>
            <div>
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <div className="bg-slate-100 p-2 flex justify-center">
                <input
                  id="confirmPassword"
                  type={confirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={handleShowConfirmPassword}
                >
                  <span>{confirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              {/* <Link to={"ForgetPassword"} className="block w-fit ml-auto  hover:underline hover:text-red-400"> Forget Password</Link> */}
            </div>
            <button className="bg-red-500  text-white px-1 py-1 mt-4 w-full rounded-md hover:bg-red-600 hover:scale-100">
              Login
            </button>
          </form>
          <div className="mt-2">
            <p>
              Existing User?{" "}
              <Link to={"/Login"} className="text-red-400 hover:text-red-700">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
