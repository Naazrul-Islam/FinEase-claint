import React, { use } from "react";

import { Navigate, useLocation } from "react-router";



import { AuthContext } from "../provider/AuthProvider";
import LoadingAnimation from "../components/LoadingAnimation";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <LoadingAnimation></LoadingAnimation>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth"></Navigate>;

  
};

export default PrivateRoute;