import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";



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
import StudentDashboard from './Layouts/StudentDashBoard/StudentDashboard';
import AdminDashboard from './Layouts/AdminDashBoard/AdminDashBoard';
import StaffDashBoard from './Layouts/StaffDashBoard/StaffDashBoard';
import Loading from './components/Loading/Loading';
import { Aboutus } from './components/AboutUs/Aboutus';
import ContactUs from './components/ContactUs/ContactUs';

axios.defaults.withCredentials = true;

let fRender = true;
function App() {
  const { dispatch, isLoggedIn,isAdmin,isCoSupervisor,isPanelMember,isSupervisor } = useContext(AuthContext);
  const [loading,setLoading]=useState(false);
 //console.log("Log",isLoggedIn,"ad",isAdmin,isCoSupervisor,isPanelMember,isSupervisor);
 
   // get user data
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getUser = async () => {

        try {
          setLoading(true);
          dispatch({ type: "SIGNING" });
          const res = await axios.get("https://rpmt-2022s1-reg-31-backend.herokuapp.com/api/auth/user", {
            withCredentials: true
          });
          dispatch({ type: "GET_USER", payload: res.data });
          //window.sessionStorage.setItem("_user", res.data.role);
          //console.log(res.data.role);
          if (res.data.role == "admin") {
            dispatch({ type: "IS_ADMIN" });
          } else if (res.data.role == "supervisor") {
            dispatch({ type: "IS_SUPERVISOR" });
          } else if (res.data.role == "coSupervisor") {
            dispatch({ type: "IS_CO_SUPERVISOR" });
          } else if (res.data.role == "panelMember") {
            dispatch({ type: "IS_PANEL_MEMBER" });
          };
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
          try {
            await axios.get("https://rpmt-2022s1-reg-31-backend.herokuapp.com/api/auth/signout")
            localStorage.removeItem("_appSignging")
            sessionStorage.clear();
            dispatch({ type: "SIGNOUT" })

          } catch (error) {
            console.log(error);
          }
        }

      };
      getUser();

      if (fRender) {

        fRender = false;

      }
      if (!fRender) {
        const refreshToken = async () => {
          await axios.post("https://rpmt-2022s1-reg-31-backend.herokuapp.com/api/auth/refresh", {
            withCredentials: true
          }).catch(err => console.log(err))
        }
        let interval = setInterval(() => {
          refreshToken().then(getUser())
        }, 1000 * 60 * 55)//55m
        return () => clearInterval(interval)
      }
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className='body'>
      <React.Fragment>
        {loading?<><Loading/></>:
        <Router>
          <header><Header /></header>

          <Navbar />

          <main>

            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ?
                    isAdmin ? <AdminDashboard /> :
                      isPanelMember || isSupervisor || isCoSupervisor ? <StaffDashBoard /> : <StudentDashboard />
                    : <AuthLayout />}
              />


              <Route
                path="/auth/reset-password/:token"
                element={<ResetLayout />}
              />

              <Route
                path="/auth/activate/:activation_token"
                element={<ActivateLayout />}
              />

                <Route
                  path="/aboutus"
                  element={<Aboutus />}
                />

                <Route
                  path="/contactus"
                  element={<ContactUs />}
                />
            
              

              <Route
                path="/updateProfile"
                element={isLoggedIn ? <ProfileUpdate /> : <Navigate to={"/"} />}
              />
              <Route
                path="/profile"
                element={isLoggedIn ? <ProfileLayout /> : <Navigate to={"/"} />}
              />

            </Routes>

          </main>

          <footer>
            <Footer />
          </footer>
            
          </Router>
          }
        </React.Fragment>
    </div>
  );
}

export default App;
