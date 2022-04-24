
import { Navigate, Outlet } from "react-router-dom";


const useAdmin = ()=>{
  const _appSignging = localStorage.getItem("_appSignging");
  const std = window.sessionStorage.getItem("_auth");

return _appSignging;


}

const AdminRoutes = ({
    isAllowed=useAdmin(),
    redirectPath="/"
}) => {
    console.log(isAllowed);
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
  };
  
  export default AdminRoutes;