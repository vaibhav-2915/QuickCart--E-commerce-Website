import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryAPI from "../common/url";
import SearchVerticalProduct from "../Components/searchVerticalProduct";

const searchProduct = ()=>{
    const query = useLocation();
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const loadingList = new Array(data.length).fill(null);  

    const fetchData = async()=>{
        const response = await fetch(SummaryAPI.searchProduct.url+query.search);
        const dataResponse = await response.json();
        setData(dataResponse.data);
    }

    useEffect(()=>{
        setLoading(true);
        fetchData();
        setLoading(false);
    },[query])

    return(
        <div className="container p-3 max-auto">
          {
            loading &&(
                 <p className="text-3xl text-center text-gray-600 animate-pulse">Loading...</p>
            )
          }
          <p className="text-3xl text-center text-gray-600 font-semibold mb-3">Search Result: {data.length}</p>
          {
            data.length === 0 && loading &&(
                    <p className="text-3xl text-center text-gray-900 p-4 ">No Result!</p>
            )
          }
          {
            data.length !== 0 && !loading && (
                   <SearchVerticalProduct loading={loading} data={data}  />
            )
          }
        </div>
    )
}
export default searchProduct;
