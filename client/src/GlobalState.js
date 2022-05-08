import React, { createContext, useEffect, useState } from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import PromotionAPI from './api/PromotionAPI'


import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    


    useEffect(() =>{
        const _appSignging = localStorage.getItem("_appSignging");
        if(_appSignging){
             
            const refreshToken = async () =>{
                try {
                    const res = await axios.get(`http://localhost:8000/api/auth/refresh`);
                   
                    setTimeout(() => {
                        refreshToken();

                    },10 * 60 * 1000)
                } catch (error) {
                    console.log(error);
                    localStorage.clear();
                    window.sessionStorage.clear();
                    window.location.href = "/";
                    
                }
            }
            refreshToken()
        }
    },[])


    
    const state = {
    userAPI: UserAPI(),
      
        
        
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}