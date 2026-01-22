import React from "react";
import successIMG from "../assest/success.gif";
import {Link} from "react-router-dom";

const Success =()=>{
    return(
        <div className="bg-slate-200 mx-auto w-full max-w-md flex justify-center items-center flex-col p-4 m-2 rounded-lg">
            <img src={successIMG} 
            width={300}
            height={300} 
            className="mix-blend-multiply"/>
            <p className="text-green-800 font-bold text-2xl">Payment Successfully </p>
            <Link to={"/order"} className="my-2 p-2 border-2 font-medium hover:bg-green-700 hover:text-white border-green-700 rounded-xl  ">See Order</Link>
        </div>
    )
}

export default Success;