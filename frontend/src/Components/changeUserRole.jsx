import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ROLE from "../common/role";
import SummaryAPI from "../common/url";
import { toast } from "react-toastify";

const changeUserRole = ({
    username,
    email,
    role,
    userId,
    onClose,
    callback,
})=>{
    const [userRole,setUserRole] = useState(role);
    
    const handleChangeRole = (e)=>{
        setUserRole(e.target.value)
        console.log(e.target.value);
    }
    const updateUserRole = async()=>{
        const updateResponse = await fetch(SummaryAPI.updateUserRole.url,{
            method:SummaryAPI.updateUserRole.method,
            credentials:"include",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({
                userId:userId,
                role:userRole,  
            })
        })
        const dataResponse = await updateResponse.json();
        console.log("dataResponse:",dataResponse);
        if(dataResponse.success){
            toast.success(dataResponse.message);
            onClose();
            callback();
        }
    }
    return(
        <div className="fixed top-0 bottom-0 right-0 left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-40 ">
            <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
                <button className="block ml-auto text-2xl" onClick={onClose}>
                    <IoCloseOutline /> 
                </button>
            <h1 className="text-lg pb-2 font-medium">Change User Role</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <div className="flex justify-between my-1">
            <label htmlFor="role">Role:</label>
            <select id="role" className="border px-2 py-1" value={userRole} onChange={handleChangeRole}>
                {
                    Object.values(ROLE).map((role)=>{
                        return(
                            <option value={role} key={role}>
                                 {role} 
                            </option>
                        )
                    })
                }
            </select>
            </div>
                <button className="w-fit mx-auto block border py-1 px-3 rounded-lg text-white bg-red-500 hover:bg-red-600" onClick={updateUserRole}>Change Role</button>
            </div>
            </div>
    )}

export default changeUserRole;