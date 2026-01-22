import React, { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
const adminPanel = () =>{
    const user = useSelector((state) => state?.user?.user);

    const navigate = useNavigate()

    useEffect(()=>{
      if(user?.role !== ROLE.ADMIN){
        navigate("/home")
      }
    })
    return(
        <div className="min-h-[calc(100vh-144px)] md:flex hidden">
           <aside className="bg-white min-h-full  w-full max-w-80 customShadow">
            <div className="h-32  flex justify-center items-center flex-col shadow-lg">
            <div
              className="text-5xl cursor-pointer relative flex justify-center ">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-10 rounded-full  "
                  alt={user?.username}
                />
              ) : (
                <FaCircleUser />
              )}
            </div>
            <p className="capitalize text-lg font-semibold">{user?.username}</p>
            <p className="text-xs">{user?.role}</p>
            </div>


              {/* navigation */}
            <div>
              <nav className="grid">
                <Link to={"allUsers"} className="px-1 py-0.5 hover:bg-slate-100">All users</Link>
                <Link to={"product"} className="px-1 py-0.5 hover:bg-slate-100"> Product</Link>
              </nav>

            </div>
           </aside>
           <main className=" w-full px-5 py-5">
              <Outlet/>
           </main>
        </div>
    )
}
export default adminPanel;