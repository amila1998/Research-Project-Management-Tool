import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = ({
    isAllowed=false,
    redirectPath="/"
}) => {
    
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
  };
  
  export default AuthRoutes;