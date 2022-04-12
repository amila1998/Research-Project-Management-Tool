import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const useAdmin = ()=>{
  const { user, dispatch, token, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getToken = async () => {
        const res = await axios.post("/api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);
  // get user data
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token]);
  return user.role=='student' && isLoggedIn;
}

const AdminRoutes = ({
    isAllowed=useAdmin(),
    redirectPath="/"
}) => {
    console.log(isAllowed);
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
  };
  
  export default AdminRoutes;