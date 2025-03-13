
import './App.css';
import Header from "./component/Header/Header.js";
import {useEffect,useState} from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/Footer/footer.js";
import Home from "./component/Home/Home.js"  ;
import Loader from "./component/layout/Loader/Loader";
import ProductDetails  from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import {loadUser} from "./actions/userAction";
import UserOptions from "./component/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword  from "./component/User/UpdatePassword.js";
import ForgotPassword  from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrders.js";
import OrderDetails from "./component/Cart/OrderDetails.js";
import Dashboard from './component/admin/Dashboard.js';
import ProductList from './component/admin/ProductList.js';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder.js';
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import UProductReviews from "./component/admin/ProductReviews.js";
import About from "./component/layout/About/About.js";
import Contact from "./component/layout/Contact/Contact.js";
import NotFound from "./component/layout/NotFound/NotFound.js";


function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user);

  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");
    
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();

  },[]);
  return (
    <Router>
      
         <Header/>

         {isAuthenticated &&<UserOptions user={user}/>}
         {stripeApiKey&&(
         <Elements stripe={loadStripe(stripeApiKey)}>
    <Routes>
        <Route exact path="/process/payment" element={<ProtectedRoute />}>
            <Route exact path="/process/payment" element={<Payment />} />
        </Route>
     </Routes>
</Elements>
         )}

<switch>
    <Routes>

      
   
  <Route  index element={<Home/>}/>
  
    <Route index path="/sad" element={<Loader/>}/>
  
     <Route index path="/product/:id" element={<ProductDetails/>}/> 
     <Route index path="/products" element={<Products/>}/> 
     <Route path="/products/:keyword" element={<Products/>}/> 
   
     <Route index path="/search" element={<Search/>}/> 

     <Route index path="/About" element={<About/>}/> 

     <Route index path="/Contact" element={<Contact/>}/> 
     

     <Route index path="/password/forgot" element={<ForgotPassword/>}/>
    
     <Route index path="/password/reset/:token" element={<ResetPassword/>}/>
    
    <Route path="/account" element={<ProtectedRoute/>}>

        <Route path="/account" element={<Profile/>}/>
    </Route>

    <Route path="/me/update" element={<ProtectedRoute/>}>

        <Route path="/me/update" element={<UpdateProfile/>}/>
    </Route>

    <Route path="/password/update" element={<ProtectedRoute/>}>

         <Route path="/password/update" element={<UpdatePassword/>}/>
   </Route>


    
   <Route path="/shipping" element={<ProtectedRoute/>}>

<Route path="/shipping" element={<Shipping/>}/>
</Route>

<Route path="/order/confirm" element={<ProtectedRoute/>}>

<Route path="/order/confirm" element={<ConfirmOrder/>}/>
</Route>

<Route path="/success" element={<ProtectedRoute/>}>

<Route path="/success" element={<OrderSuccess/>}/>
</Route>

<Route path="/orders" element={<ProtectedRoute/>}>

<Route path="/orders" element={<MyOrders/>}/>
</Route>

<Route path="/order/:id" element={<ProtectedRoute/>}>

<Route path="/order/:id" element={<OrderDetails/>}/>
</Route>

<Route path="/admin/dashboard" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/dashboard" element={<Dashboard/>}/>
</Route>

<Route path="/admin/products" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/products" element={<ProductList/>}/>
</Route>

<Route path="/admin/product" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/product" element={<NewProduct/>}/>
</Route>

<Route path="/admin/product/:id" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>}/>
</Route>

<Route path="/admin/orders" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/orders" element={<OrderList/>}/>
</Route>

<Route path="/admin/order/:id" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/order/:id" element={<ProcessOrder/>}/>
</Route>

<Route path="/admin/users" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/users" element={<UsersList/>}/>
</Route>

<Route path="/admin/user/:id" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>}/>
</Route>

<Route path="/admin/reviews" element={<ProtectedRoute/>}>

<Route isAdmin={true} path="/admin/reviews" element={<UProductReviews/>}/>
</Route>

    <Route exact path="/login" element={<LoginSignUp/>}></Route>
    
    <Route exact path="/cart" element={<Cart/>}/>
  
    <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
    </Routes>
      
   

    </switch>
 
    <Footer/>
    </Router>
    
    
  );
}

export default App;
