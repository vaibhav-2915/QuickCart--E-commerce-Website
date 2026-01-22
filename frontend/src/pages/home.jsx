import React from "react";
import CategoryList from "../Components/categoryList";
import BannerProduct from "../Components/bannerProduct";
import HorizontalCardProduct from "../Components/horizontalCardProduct";
import VerticalCard from "../Components/verticalCard";

const home = ()=>{
    return(
        <div> 
            <CategoryList/>
            <BannerProduct/>
            <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpods"}/>
            <HorizontalCardProduct category={"earphones"} heading={"Popular's Earphones"}/>
            <HorizontalCardProduct category={"trimmers"} heading={"Popular's Earphones"}/>
            <VerticalCard category={"mobile"} heading={"Mobile"}/>
            <VerticalCard category={"mouse"} heading={"Mouse"}/>
            <VerticalCard category={"camera"} heading={"Speaker"}/>
            <VerticalCard category={"speakers"} heading={"Speaker"}/>
            <VerticalCard category={"refrigerator"} heading={"Refrigerator"}/>
     </div>
    )
}

export default home;