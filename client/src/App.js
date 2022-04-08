import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Headers/Header';
import Navbar from './components/Headers/navbar';
import Footer from './components/Footers/Footer';
import './App.css';

import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";



function App() {
  const isLoggedIn = false;
  return (
    <div>
      
       <Router>

        <Header/>
        <Navbar/>
       
        <main>
           
            <Routes>

              <Route
              path="/"
              element={isLoggedIn?<ProfileLayout/>:<AuthLayout/>}
              />

            </Routes>
        
        </main>
        <Footer/>
       </Router>
    </div>
  );
}

export default App;
