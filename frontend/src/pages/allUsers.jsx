import React, { useEffect, useState } from "react";
import SummaryAPI from "../common/url";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../Components/changeUserRole";
const allUsers = ()=>{
    const [allUsers,setAllUsers] = useState([]);
    const [openUpdateRole,setOpenUpdateRole] = useState(false);
    const [updateUserDetails,setUpdateUserDetails] = useState({
        username:"",
        email:"",
        role:"",
        _id:"",
    })

    const fetchAllUsers = async()=>{
        const response = await fetch(SummaryAPI.allUsers.url,{
            method:SummaryAPI.allUsers.method,
            credentials:"include"
        })

        const dataResponse = await response.json();
        console.log("dataResponse:",dataResponse);
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
        console.log(allUsers);
        console.log(dataResponse);
    }


    useEffect(()=>{
        fetchAllUsers();
    },[]);

    return(
        <div className="bg-white shadow-md ">
            <table className="w-full userTable">
                <thead className="bg-slate-100">
                    <tr>
                    <th>Sno.</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                   { allUsers.length === 0 ?(<tr>
                          <td colSpan="5">No Users Found</td>
                   </tr>):(
                       allUsers.map((user,index)=>{
                            console.log(allUsers)
                            return(

                                <tr>
                                    <td className="bg-slate-100">{index+1}</td>  
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td>{!user.role?"NULL":user.role}</td>
                                    <td>{moment(user.createdAt).format('ll')}</td>
                                    <td className="bg-green-50 hover:bg-green-200 ">
                                       <button onClick={()=>{
                                        setUpdateUserDetails(user)
                                        setOpenUpdateRole(prev=>!prev)
                                        }}>
                                            <MdEdit /></button> 
                                    </td>
                                </tr>
                            )
                        })
                    )
                   }
                </tbody>
            </table>
            {
                openUpdateRole &&(
                    <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)}
                    username={updateUserDetails.username} //passing as a props to the changeUserRole component
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callback={fetchAllUsers}
                     />
                )
            }
        </div>
    )
}

export default allUsers;
