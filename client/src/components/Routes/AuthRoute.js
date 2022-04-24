
import { Navigate, Outlet } from "react-router-dom";



// get ac token

const useAuth = ()=>{
 
        const _appSignging = localStorage.getItem("_appSignging");
        const std = window.sessionStorage.getItem("_auth");
  
 return _appSignging ;

};

const AuthRoutes = ({
     redirectPath="/"
}) => {
    const isAllowed = useAuth();
    return isAllowed? <Outlet /> : <Navigate to={redirectPath} />;
  };
  
  export default AuthRoutes;