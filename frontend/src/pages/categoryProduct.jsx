import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCaregory from "../helper/poductCategory";
import SearchVerticalProduct from "../Components/searchVerticalProduct";
import SummaryAPI from "../common/url";

const categoryProduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearchParams.getAll("category");

    const urlCategoryListObject = {};
    urlCategoryListInArray.forEach(items =>{
        urlCategoryListObject[items] = true;
    })
    
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("");

    const fetchData = async () => {
        const response = await fetch(SummaryAPI.filterProduct.url, {
            method: SummaryAPI.filterProduct.method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                category: filterCategoryList
            })
        });
        const dataResponse = await response.json();
        setData(dataResponse.data);

    }
    const handleSelectCategory = (e) => {
        const { name, value, checked } = e.target;
        setSelectCategory((prev) => {
            return {
                ...prev,
                [value]: checked
            }
        })
    }
    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, [filterCategoryList])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
            if (selectCategory[categoryKeyName]) {
                return categoryKeyName
            }
            return null;
        }).filter(el => el);

        //formate url change while select category  
        const urlFormate = arrayOfCategory.map((el,index) =>{
            if((arrayOfCategory.length - 1) === index){
                return `category=${el}`
            }
            return `category=${el}&&`
        })

        navigate("/categoryProduct?"+urlFormate.join(""))
        setFilterCategoryList(arrayOfCategory);
    }, [selectCategory]);

    const handleChangeSortBy =(e) => {
        const {value} = e.target;
        setSortBy(value);
        if(value === "asc"){
            setData(data.sort((a,b)=> a.sellingPrice - b.sellingPrice))
        }
        if(value ==="desc"){
            setData(data.sort((a,b)=>b.sellingPrice - a.sellingPrice))
        }
    }
    useEffect(()=>{

    },[sortBy])

    return (
        <div className="container max-auto p-4">

            <div className="grid grid-cols-[200px,1fr] ">
                {/* filter by price */}
                <div className="bg-white p-3 min-h-[calc(100vh-155px)] overflow-y-scroll">
                    <div className="">
                        <p className="text-lg border-b p-1 text-slate-500 Capitalized font-medium shadow-md">Sort By</p>
                        <form className="text-md flex flex-col gap-1 py-1">
                            <div className="flex items-center gap-1">
                                <input type="radio" name="sortBy" value={"desc"} 
                                setSortBy={sortBy === 'desc'}
                                onChange={handleChangeSortBy}/>
                                <label htmlFor="sortBy">Price - High to Low</label>
                            </div>
                            <div className="flex items-center gap-1">
                                <input type="radio" name="sortBy" value={"asc"}
                                setSortBy={sortBy === "asc"} 
                                onChange={handleChangeSortBy}/>
                                <label htmlFor="sortBy">Price - Low to High </label>
                            </div>
                        </form>
                    </div>
                    <div className="">
                        <p className="text-lg border-b p-1 text-slate-500 Capitalized font-medium shadow-md">Category</p>
                        <form className="text-md flex flex-col gap-1 py-1">
                            {
                                productCaregory.map((categoryName, index) => {
                                    return (
                                        <div className="flex items-center gap-1" key={index}>
                                            <input type="checkbox" name={"category"} id={categoryName?.value}
                                                value={categoryName?.value}
                                                checked={selectCategory[categoryName?.value]}
                                                onChange={handleSelectCategory} />
                                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                                        </div>
                                    )
                                })
                            }
                        </form>
                    </div>
                </div>

                {/* right side product */}
                <div >
                    <h2 className="ml-2 font-medium text-slate-600 px-2">Search result: {data.length}</h2>
                <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]" >
                    {
                         data.length !== 0 && (
                            <SearchVerticalProduct data={data} loading={loading} />
                        )
                    }
                </div>
                </div>
            </div>

        </div>
    )
}

export default categoryProduct;