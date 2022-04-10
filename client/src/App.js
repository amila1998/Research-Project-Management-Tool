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



function App() {
  const isLoggedIn = false;
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
          path="/api/auth/activate/:activate_token"
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
