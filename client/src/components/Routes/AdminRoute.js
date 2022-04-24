
import { Navigate, Outlet } from "react-router-dom";


const useAdmin = ()=>{
  const _appSignging = localStorage.getItem("_appSignging");
  const std = window.sessionStorage.getItem("_auth");

return _appSignging;


}

const AdminRoutes = ({
    
    redirectPath="/"
}) => {
  const isAllowed=useAdmin();
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
  };
  
  export default AdminRoutes;