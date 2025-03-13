
const express=require("express");
const cors = require('cors');
const app=express();
const cookieParser=require("cookie-parser");
const path = require("path");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");

const errorMiddleware=require("./middleware/error");


dotenv.config({path:"backend/config/config.env"});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route Imports

const product=require("./route/productRoute");
const user=require("./route/userRoute");
const order=require("./route/orderRoute");
const payment=require("./route/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1/",user);
app.use("/api/v1/",order);
app.use("/api/v1/",payment);


app.use(express.static(path.join(__dirname, "../frontend/build")));
// Middleware For Errors

app.use(errorMiddleware);

module.exports=app;