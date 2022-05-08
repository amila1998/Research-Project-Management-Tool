import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";



import Header from './components/Headers/Header';
import Navbar from './components/Headers/navbar';
import Footer from './components/Footers/Footer';
import './App.css';

import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ResetLayout from './Layouts/ResetPasswordLayout/ResetLayout';
import ActivateLayout from "./Layouts/ActivateLayout/ActivateLayout";

import { AuthContext } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import ProfileUpdate from './components/Profile/ProfileUpdate';
import AuthRoutes from './components/Routes/AuthRoute';
import StudentDashboard from './Layouts/StudentDashBoard/StudentDashboard';
import AdminRoutes from './components/Routes/AdminRoute';
import AdminDashboard from './Layouts/AdminDashBoard/AdminDashBoard';
import Login from './components/Login/Login';

axios.defaults.withCredentials = true;

let fRender = true;
function App() {
  const { user, dispatch, isLoggedIn } = useContext(AuthContext);

 
 
   // get user data
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getUser = async () => {
        
        try {
          dispatch({ type: "SIGNING" });
          const res = await axios.get("http://localhost:8000/api/auth/user",{
            withCredentials:true
          });
          dispatch({ type: "GET_USER", payload: res.data });
          window.sessionStorage.setItem("_user", res.data.role);
          
        } catch (error) {
          console.log(error);
          try {
            await axios.get("http://localhost:8000/api/auth/signout")
            localStorage.removeItem("_appSignging")
            sessionStorage.clear();
            dispatch({type:"SIGNOUT"})
            
          } catch (error) {
            console.log(error);
          }
        }
       
      };
      getUser();

      if(fRender){
        
        fRender = false;
        
      }
      if(!fRender){
        const refreshToken = async ()=>{
          await axios.post("http://localhost:8000/api/auth/refresh",{
            withCredentials:true
          }).catch(err => console.log(err))
        }
        let interval = setInterval(()=>{
          refreshToken().then(getUser())
        },1000*28)
        return ()=>clearInterval(interval)
      }
      
      
      
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className='body'>
      <React.Fragment>
        <Router>
          <header><Header/></header>
            
            <Navbar/>
          
            <main>
              
              <Routes>
              <Route
                  path="/"
                  element={isLoggedIn? user.role=='student'?<StudentDashboard/>:user.role=='admin'&&<AdminDashboard/>:<AuthLayout/>}
                />

                <Route
                  path="/auth/reset-password/:token"
                  element={<ResetLayout/>}
                />

                <Route
                  path="/api/auth/activate/:activation_token"
                  element={<ActivateLayout/>}
                />

                {/* Auth Protected Routes */}
                <Route element={<AuthRoutes />}> 
                  <Route
                    path="/updateProfile"
                    element={<ProfileUpdate/>}
                  />
                  <Route
                    path="/profile"
                    element={<ProfileLayout/>}
                  />
                </Route> 
              </Routes>
            
          </main>

          <footer>
            <Footer/>
          </footer>
            
          </Router>
        </React.Fragment>
    </div>
  );
}

export default App;
