import React from "react";

const scrollTop =()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}

// const scrollBottom = ()=>{
//     window.scrollTo({
//         top:document.body.scrollHeight,
//         behavior:"smooth"
//     })
// }
export default scrollTop;