import React, { useEffect } from "react";
import SummaryAPI from "../common/url";
import { useState } from "react";
import moment from "moment";
import displayCurrencyInd from "../helper/currnencyIND";

const Order = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await fetch(SummaryAPI.order.url, {
            method: SummaryAPI.order.method,
            credentials: "include",
        })
        const responseData = await response.json();
        setData(responseData.data)
        console.log("responseData:", responseData)
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {
               !data[0] && (
                <h1>No Order Placed</h1>
            )
            }

            <div className="p-4" >
                {
                    data.map((item, index) => {
                        return (
                            <div key={item.userId + index}>
                                <p>{moment(item.createdAt).format('LL')}</p>
                                <div className=" border rounded  bg-slate-100">
                                    <div className="flex flex-col lg:flex-row justify-between ">
                                    <div  >
                                        <div className="grid gap-2" >
                                            {
                                                item.productDetails.map((product, index) => {
                                                    return (
                                                        <div className=" flex  " key={product.productId + index}  >
                                                            <img className=" bg-slate-200 object-scale-down gap-2 w-36 h-36  mix-blend-multiply p-2 " src={product.image[0]} alt="" />
                                                            <div className="px-2">
                                                                <p >{product.name}</p>
                                                                <div className="flex gap-6 mt-1 ">
                                                                    <p className="font-medium ">{displayCurrencyInd(product.price)}</p>
                                                                    <p className="border rounded-lg px-1 text-xs flex items-center justify-center bg-slate-200 border-gray-500">Qty: {product.quantity}</p>
                                                                </div>
                                                            </div>

                                                            {/* payment details */}

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col  gap-4 p-4">
                                            <div className="text-3xl font-medium">Payment Summary</div>
                                            <div className="flex flex-col gap-2">
                                                <p className="capitalize font-serif  ml-1">Payment Method: {item.paymentDetails.payment_method_type[0]}</p>
                                                <p className="capitalize font-serif   ml-1">Payment Status: {item.paymentDetails.payment_status}</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="capitalize font-semibold  ml-1">Shipping Details</div>
                                                {
                                                    item.shipping_options.map((shipping, index) => {
                                                        return (
                                                            <div className="font-serif ml-1">
                                                                Shipping Amount: ₹{shipping.shipping_amount / 100}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                        <div className="font-medium mb-4  mr-4 lg:ml-auto w-fit text-2xl">Total Amount: {displayCurrencyInd(item.totalAmount)}</div>
                                </div>
                            </div>

                        )

                    })
                }

            </div>
        </div>
    )
}
export default Order;   