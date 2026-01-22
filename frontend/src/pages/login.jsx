import React from "react";
import LoginImg from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState,useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import SummaryAPI from "../common/url";
import { toast } from "react-toastify";
import Context from "../context/Context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email:"",
    password:"",
  });
  const nevigate = useNavigate();
  const {fetchUerDetails,fetchUserAddToCartProduct} = useContext(Context);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e)=>{
    const {name, value} = e.target
    setData((prevData)=>{
      return{
        ...prevData,
      [name]:value,
      }     
    })
  }
  // console.log(data)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const dataResponse  = await fetch(SummaryAPI.LogIn.url,{
      method:SummaryAPI.LogIn.method,
      credentials:"include",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify(data),
    });
    const dataAPI = await dataResponse.json();
    if(dataAPI.success){
      toast.success(dataAPI.message);
      nevigate("/")
      fetchUerDetails();
      fetchUserAddToCartProduct();
      }
    if(dataAPI.error){
      toast.error(dataAPI.message);
    }
    console.log(dataAPI);
  }

  return (
    <section id="login">
      <div className="mx-auto container px-4 mt-6">
        <div className="bg-white p-2 py-4 w-full max-w-lg mx-auto rounded-md ">
          <div className="w-24 h-15 mx-auto ">
            <div>
            <img src={LoginImg} alt="login" className="rounded-md" />
            </div>
          </div>
          <form className="pt-6 px-2 flex flex-col" onSubmit={handleSubmit}>
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
              <Link to={"ForgetPassword"} className="block w-fit ml-auto  hover:underline hover:text-red-400"> Forget Password</Link>
            </div>
            <button className="bg-red-500  text-white px-1 py-1 mt-4 w-full rounded-md hover:bg-red-600 hover:scale-100">
              Login
            </button>
          </form>
          <div className="mt-2">
          <p>Don't have account?<Link to={"/Signup"} className="text-red-400 hover:text-red-700"> Signup</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
