import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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



function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext);

  // get ac token
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




  return (
    <div className='body'>
      
       <Router>

        <Header/>
        <Navbar/>
       
        <main>
           
            <Routes>

              <Route
              path="/"
              element={isLoggedIn?<ProfileLayout/>:<AuthLayout/>}
              />

          <Route
          path="/auth/reset-password/:token"
          element={<ResetLayout/>}
          />

          <Route
          path="/api/auth/activate/:activation_token"
          element={<ActivateLayout/>}
        />

            </Routes>
        
        </main>
        <Footer/>
       </Router>
    </div>
  );
}

export default App;
