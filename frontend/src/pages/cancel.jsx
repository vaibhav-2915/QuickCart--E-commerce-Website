import react from 'react'
import cancelIMG from "../assest/cancel.jpg";
import {Link} from "react-router-dom";

const Cancle = ()=>{
    return(
        <div className="bg-slate-200 mx-auto w-full max-w-md flex justify-center items-center flex-col p-4 m-2 rounded-lg">
            <img src={cancelIMG} 
            width={300}
            height={300} 
            className="mix-blend-multiply"/>
            <p className="text-red-600 font-bold text-2xl">Payment Cancel </p>
            <Link to={"/cart"} className="my-2 p-2 border-2 font-medium hover:bg-red-600 hover:text-white border-red-600 rounded-xl  ">Go To Cart</Link>
        </div>
    )
}
export default Cancle;
