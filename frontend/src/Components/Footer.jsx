import React from "react";
const Footer =() =>{
    return(
        <footer className="bg-slate-200 ">
            <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 lg:grid-cols-4  gap-4">
                   <div>
                    <h1 className="text-sm font-bold text-gray-500">About</h1>
                    <div>
                        <p>Contact Us</p>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Shop here</p>
                        <p>Press</p>
                    </div>
                   </div>
                   <div className="hidden lg:block" >
                    <h1 className="text-sm font-bold text-gray-500">Group Companies</h1>
                    <p>Myntra</p>
                    <p>Cleartrip</p>
                    <p>Shopsy</p>
                   </div>
                   <div  >
                    <h1 className="text-sm  font-bold  text-gray-500">Help</h1>
                    <p>Payment</p>
                    <p>Shipping</p>
                    <p>Cancellation & Return</p>
                    <p>FAQ</p>
                   </div>
                   <div className="hidden lg:block">
                    <h1 className="text-sm font-bold text-gray-500">Consumer Policy</h1>
                    <p>Cancellation & Return</p>
                    <p>Terms of Use Security</p>
                    <p>Privacy</p>
                    <p>Sitemap</p>
                   </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-4 ">
                    <div>
                        <h1 className="text-sm font-bold text-gray-500">Mail us:</h1>
                    Flipkart Internet Private Limited, Buildings Alyssa, 
                    Begonia & Clove Embassy Tech Village, 
                    Outer Ring Road, Devarabeesanahalli Village,
                     Bengaluru, 560103, Karnataka, India
                    </div>
                    <div className="hidden lg:block">
                        <h1 className="text-sm font-bold text-gray-500 ">Registered Office Address:</h1>
                    Flipkart Internet Private Limited, 
                    Buildings Alyssa, Begonia & Clove Embassy Tech Village, 
                    Outer Ring Road, Devarabeesanahalli Village, 
                    Bengaluru, 560103, Karnataka, India.
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;