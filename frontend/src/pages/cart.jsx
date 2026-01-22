import React, { useContext, useEffect, useState } from "react";
import SummaryAPI from "../common/url";
import Context from "../context/Context";
import displayCurrencyIND from "../helper/currnencyIND";
import {loadStripe} from "@stripe/stripe-js";

const Cart = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context)
    const loadingList = new Array(context.cartProduct).fill(null);

    const fetchData = async () => {

        const response = await fetch(SummaryAPI.viewCartProduct.url, {
            method: SummaryAPI.viewCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
        })
        const dataResponse = await response.json()

        if (dataResponse.success) {
            setData(dataResponse.data);
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    const increaseQuantity = async (id, qty) => {
        const response = await fetch(SummaryAPI.updateAddToCartProduct.url, {
            method: SummaryAPI.updateAddToCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1,
            })
        })
        console.log(response)

        const dataResponse = await response.json();
        if (dataResponse.success) {
            fetchData();
        }
    }
    const decreaseQuantity = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryAPI.updateAddToCartProduct.url, {
                method: SummaryAPI.updateAddToCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1,
                })
            })

            const dataResponse = await response.json();
            if (dataResponse.success) {
                fetchData();
            }
        }

    }

    const RemoveProductFromCart = async (id) => {
        const response = await fetch(SummaryAPI.deleteAddToCartProduct.url, {
            method: SummaryAPI.deleteAddToCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                _id: id
            })

        })
        const dataResponse = await response.json();
        console.log(dataResponse.data)
        if (dataResponse.success) {
            fetchData()
            context.fetchUserAddToCartProduct()
        }
    }

    const handlePayment = async()=>{
        // console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
        const response = await fetch(SummaryAPI.payment.url,{
            method:SummaryAPI.payment.method,
            credentials:'include',
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({
                cardItems:data
            })
        })
        console.log("response:",response)
        const dataResponse = await response.json();
        if(dataResponse.id){
            stripePromise.redirectToCheckout({sessionId:dataResponse.id})
        }
        console.log("payment:",dataResponse)
    }

    const totalQty = data.reduce((prevValue, currValue) => prevValue + currValue.quantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className="container mx-auto">
            <div className="  text-center text-lg my-2">
                {
                    data.length === 0 && !loading && (
                        <p className="bg-white py-4 font-medium text-lg " >No data</p>
                    )
                }
            </div>
            <div className="flex flex-col lg:flex-row gap-3 justify-between">
                <div className="px-2 w-full max-w-3xl">
                    {
                        loading ? (
                            loadingList.map((item, index) => {
                                return (
                                    <div key={item + index} className="w-full bg-slate-200 h-32 rounded-md   my-1 border border-slate-300 animate-pulse ">
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <div key={item?._id} className=" group flex w-full bg-white h-32 rounded-md my-1 border border-gray-300 relative">
                                                <div className="w-36 h-full bg-slate-100">
                                                    <img src={item?.productId?.productImage[0]} className="h-full w-full object-scale-down mix-blend-multiply " />
                                                </div>
                                                <div className="p-2 flex-grow">
                                                    <div className="absolute right-0 mr-2 hidden group-hover:block transition-all ">
                                                        <button className="bg-slate-500 text-white p-1 rounded-md hover:bg-slate-400" onClick={() => { RemoveProductFromCart(item?._id) }}>Remove</button>
                                                    </div>
                                                    <h2 className=" text-lg lg:text-xl text-ellipsis line-clamp-1">{item?.productId?.productName}</h2>
                                                    <p className="capitalize text-sm text-slate-400 ">{item?.productId?.category}</p>

                                                    <div className="flex justify-between items-center my-1">
                                                        <div className="flex items-center gap-3">
                                                            <p className="text-md line-through text-slate-600">{displayCurrencyIND(item?.productId?.productPrice)}</p>
                                                            <p className="text-lg font-semibold ">{displayCurrencyIND(item?.productId?.sellingPrice)}</p>
                                                        </div>
                                                        <div className="">
                                                            <p className="text-lg font-semibold ">{displayCurrencyIND(item?.productId?.sellingPrice * item?.quantity)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex  h-8 items-center gap-3">
                                                        <button className="px-2 border border-gray-500 rounded-lg flex justify-center items-center " onClick={() => { decreaseQuantity(item?._id, item?.quantity) }}> - </button>
                                                        <span className="text-slate-500 border border-3 px-2 border-slate-600 rounded-sm">{item?.quantity}</span>
                                                        <button className="px-2 border border-gray-500 rounded-lg flex justify-center items-center " onClick={() => { increaseQuantity(item?._id, item?.quantity) }} >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>

            {
                data[0] &&(
                <div className="mt-4 lg:mt-0 w-full max-w-sm">
                    {
                        loading ? (
                            <div className="h-44  bg-slate-200 border border-slate-300 animate-pulse">
                                Total
                            </div>
                        ) : (
                            <div className="h-44 bg-slate-200">
                                <h2 className="text-white bg-red-500 px-3 py-2 font-medium">Summary</h2>
                                <div className="flex justify-between items-center gap-2 px-3">
                                    <p>Quantity:</p>
                                    <p className="border border-slate-300 px-1 rounded-full text-center">{totalQty}</p>
                                </div>
                                <div className="flex justify-between items-center gap-2 px-3">
                                    <p>Total:</p>
                                    <p className="text-lg font-medium justify-between items-center"> {displayCurrencyIND(totalPrice)}</p>
                                </div>
                                <p className="px-3">Cash on delivery</p>
                                <button className=" p-2 text-center w-full mt-11 bg-blue-500 hover:bg-blue-600 text-white" onClick={handlePayment}>Payment</button>

                            </div>
                        )
                    }
                    </div>

                    )
                }
            </div>
        </div>
    )
}

export default Cart;