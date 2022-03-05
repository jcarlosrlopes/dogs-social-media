import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const ProtectedRoute = ({ children }) => {
   const { isLogged } = React.useContext(UserContext);

   return isLogged ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
