const express = require("express");
const router = express.Router();

const authToken = require("../middleware/authtoken");
const userSignup = require("../controller/user/signup");
const userLogin = require("../controller/user/login");
const userLogOut = require("../controller/user/logout");
const userDetails = require("../controller/user/userDetail");
const allUsers = require("../controller/user/allUsers")
const userUpdateRole = require("../controller/user/updateUserRole");
const uploadProduct = require("../controller/product/uploadProduct");
const displayProduct = require("../controller/product/getProduct");
const updateProduct  = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getCategoryProductOne = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCart = require("../controller/user/addToCartproduct");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartVeiwProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProduct = require("../controller/product/filterProduct");
const payment = require("../controller/Order/payment");
const webhook = require("../controller/Order/webhook");
const Order = require("../controller/Order/order");


router.post("/signup",userSignup);
router.post("/login",userLogin);
router.get("/userDetails",authToken,userDetails)
router.get("/logout",userLogOut)

//admin panel
router.get("/allUser",authToken,allUsers)
router.post("/userUpdate",authToken,userUpdateRole);

router.post("/uploadProduct",authToken,uploadProduct); // upload product
router.get("/displayProduct",displayProduct); // display product
router.post("/updateProduct",authToken,updateProduct)  //update the existing product
router.get("/productCategory",getCategoryProduct)
router.get("/productCategoryOne",getCategoryProductOne)
router.post("/getCategoryWiseProduct",getCategoryWiseProduct)
router.post("/getProductDetails",getProductDetails)

//user add to cart
router.post("/addToCart",authToken,addToCart)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct);
router.get("/viewCartProduct",authToken,addToCartViewProduct)
router.post("/updateAddToCartProduct",authToken,updateAddToCartProduct);
router.post("/deleteAddToCartProduct",authToken,deleteAddToCartProduct)
//search product
router.get("/search",searchProduct);
router.post("/filterProduct", filterProduct);

//payment and order
router.post("/checkout",authToken,payment);
router.post("/webhook",webhook)  // /api/webhook
router.get("/order",authToken,Order)

module.exports = router;