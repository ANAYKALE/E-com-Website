import React,{Fragment, useEffect} from "react";
import {FaBeer} from "react-icons/fa";
import "./Home.css";
import ProductCard from "./Product.js";
import MetaData from  "../layout/MetaData";
import {getProduct} from "../../actions/productAction";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";





const Home=()=>{

    const alert=useAlert();
    const dispatch=useDispatch();
    const {loading,error,products}=useSelector((state) => state.products);
    
    useEffect(()=>{
        if(error){
            return alert.error(error)
        }
        dispatch(getProduct());
    },[dispatch,error,alert]);

    return (
    <Fragment>
{loading?(<Loader/>):( <Fragment>

<MetaData title="ECOMMERCE"/>
<div className="banner">

<p>Welcome to MERNMART</p>
<h1>FIND AMAZING PRODUCTS BELOW</h1>
<a href="#container">
<button>
    Scroll <FaBeer/>
</button>
</a>
</div>
<h2 className="homeHeading">Featured Products</h2>
<div className="container" id="container">
{products && products.map((product)=>(
<ProductCard key={product._id}product={product}/>
))}


</div>
</Fragment>
)}
    </Fragment>
    );
};

export default Home;