import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import router from './router/index.js'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter,} from "react-router-dom";
import Login from './pages/login.jsx'
import Home from './pages/home.jsx'
import ForgetPassword from './pages/forgetPassword.jsx'
import Signup from './pages/signup.jsx'
import AdminPanel from './pages/adminPanel.jsx'
import AllUsers from './pages/allUsers.jsx';
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Product } from './pages/product.jsx'
import UploadProduct from './Components/uploadProduct.jsx'
import CategoryProduct from './pages/categoryProduct.jsx'
import ProductDetails from './pages/productDetails.jsx'
import Cart from './pages/cart.jsx'
import SearchProcuct from './pages/searchProduct.jsx'
import Success from './pages/success.jsx'
import Cancle from './pages/cancel.jsx'
import Order from './pages/order.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"login",
          element:<Login/>
        },
        {
          path:"/login/forgetPassword",
          element:<ForgetPassword/>
        },
        {
          path:"/Signup",
          element:<Signup/>
        },
        {
          path:"categoryProduct",
          element:<CategoryProduct/>
        },
        {
          path:"/product/:id",
          element:<ProductDetails/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
        {
          path:"/search",
          element:<SearchProcuct/>
        },
        {
          path:"/success",
          element:<Success/>
        },
        {
          path:"/cancel",
          element:<Cancle/>
        },
        {
          path:"/order",
          element:<Order/>
        },
        {
          path:"/adminPanel",
          element:<AdminPanel/>,
          children:[
            {
              path:"allUsers",
              element:<AllUsers/>
            },
            {
              path:"product",
              element:<Product/>
            },
            {
              path:"uploadProduct",
              element:<UploadProduct/>
            }
          ]
        },
      ]
    },
   
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
