import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryAPI from "./common/url";
import Context from "./context/Context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";


function App() {
  const [cartProduct,setCartProduct] = useState(0);
  const dispatch = useDispatch();
  const fetchUerDetails = async () => {
    const dataResponse = await fetch(SummaryAPI.currDetails.url, {
      method: SummaryAPI.currDetails.method,
      credentials: "include",
    });
    const dataAPI = await dataResponse.json();
    if(dataAPI.success){
      dispatch(setUserDetails(dataAPI.data));
    }
  };

  
  const fetchUserAddToCartProduct = async(req,res)=>{
    const dataResponse = await fetch(SummaryAPI.countAddToCartProduct.url,{
      method:SummaryAPI.countAddToCartProduct.method,
      credentials:"include",
    });

    const dataAPI = await dataResponse.json();
    if(dataAPI.success){
      setCartProduct(dataAPI.data.count)
    }
  }

  useEffect(() => {
    fetchUerDetails();
    fetchUserAddToCartProduct();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          fetchUerDetails, //user details fetch
          cartProduct, //cart product count
          fetchUserAddToCartProduct, //cart product count fetch
        }}
      >
        <ToastContainer
        position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-60px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
