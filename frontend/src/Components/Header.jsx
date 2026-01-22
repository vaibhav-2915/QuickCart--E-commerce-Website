import React, { useContext, useState } from "react";
import Logo from "./logo.jsx";
import { IoSearch } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { TbShoppingCartFilled } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryAPI from "../common/url.jsx";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice.jsx";
import ROLE from "../common/role.jsx";
import Context from "../context/Context.jsx";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log("user:",user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const displayMenu = () => {
    setMenuDisplay((prev) => !prev);
  };

  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.getAll("q");
  const [search,setSearch] = useState(searchQuery)

  const handleLogOut = async () => {
    const response = await fetch(SummaryAPI.userLogOut.url, {
      method: SummaryAPI.userLogOut.method,
      credentials: "include",
    });
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
    const {value} = e.target;
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate(`/search`)
    }
  }
  return (
    <header className="h-16 bg-white shadow-md fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center justify-between px-4 ">
        <div className="h-20 w-28 object-scale-down mix-blend-multiply flex justify-center items-center"   >
          <Link to={"/"}>
            <img src="/STORE.png" alt="img"className="h-full w-16 object-contain mix-blend-multiply" />
          </Link>
        </div>
        <div className="hidden lg:flex justify-center items-center w-full max-w-sm border rounded-full focus-within:shadow-lg">
          <input
            value={search}
            type="text"
            placeholder="Search"
            className="outline-none	block w-full text-lg  pl-2 rounded-full" onChange={handleSearch}
          />
          <div className="text-2xl h-[1.75rem] w-12 text-white flex items-center justify-center bg-red-600 rounded-r-full">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-6">
        {
              user?._id &&(
          <Link to={"/cart"} className="text-2xl relative">
                <div className="bg-red-400 w-4 p-2 flex items-center justify-center h-4 rounded-md absolute -top-1.5 right-0">
                    <p className="text-sm p-2">
                      {context.cartProduct}
                    </p>
            </div>
             
            
            <span >
              <TbShoppingCartFilled />
            </span>
          </Link>
        )
      }
          <div className="relative  flex justify-center">
            {
              user?._id &&(
            <div
              className="text-3xl cursor-pointer relative flex justify-center w-10 h-10"
              onClick={displayMenu}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-8 rounded-full"
                  alt={user.name}
                />
              ) : (
                <FaCircleUser />
              )}
            </div>
              )
            }
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-1 shadow-lg rounded-md">
                <nav>
                  {
                    user?.role === ROLE.ADMIN &&(
                  <Link
                    to={"/adminPanel/product"}
                    className="whitespace-nowrap  hover:bg-slate-100 p-1 hidden md:block"
                    onClick={displayMenu}
                  >
                    {" "}
                    Admin Panel
                  </Link>
                    )
                  }
                  <Link to={"/order"} className="whitespace-nowrap  hover:bg-slate-100 p-1 hidden md:block" onClick={displayMenu}>Order</Link>
                </nav>
              </div>
            )}
          </div>
          <div>
            {user?._id ? ( //if user is logged in
              <button
                onClick={handleLogOut}
                className="bg-red-500 rounded-xl px-3 py-1 hover:bg-red-600 text-white"
              >
                {" "}
                Log Out
              </button>
            ) : (
              <Link
                to={"/Login"}
                className="bg-red-500 rounded-xl px-3 py-1 hover:bg-red-600 text-white"
              >
                {" "}
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
