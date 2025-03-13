import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";

import { Navigate,Outlet,Route,Routes } from 'react-router-dom';
const ProtectedRoute = ({ isAdmin,element: Element, ...rest }) => {

  const { loading, isAuthenticated,user} = useSelector(state => state.user);
        
  // return(
  //   <Fragment>
  //     {loading===false&&(
  //       <Routes>
  //       <Route
  //       {...rest}
  //       render={(props)=>{
  //         if(isAuthenticated===false)
  //         {
  //           return <Navigate to="/login"/>
  //         }
  //         if(isAdmin===true&&user.role!=="admin")
  //         {
  //           return <Navigate to="/login"/>
  //         }

  //         return <Component{...props}/>;
  //       }}
  //       />
  //       </Routes>
  //     )}
  //   </Fragment>
  // )
  if (loading) {
      return <h2>Loading...</h2>
  }
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;      

}

export default ProtectedRoute;