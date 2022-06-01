import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;
import './downloadTemplates.scss';

const DownloadTemplates = () => {
    const [templates,setTemplates]=useState([]);

    useEffect(() => {
        
        const getAll =async()=>{
            try {
                const res = await axios.get('/api/template/getAll');
                console.log("🚀 ~ file: DownloadTemplates.jsx ~ line 12 ~ getAll ~ res", res)
                setTemplates(res.data.templates)
            } catch (error) {
            console.log("🚀 ~ file: DownloadTemplates.jsx ~ line 12 ~ getAll ~ error", error)
                
            }
        }
        getAll()
    }, [])
    
  return (
    <div>
        <h1>DOWNLOAD TEMPLATES</h1>
        {templates.map(i=>
            <div key={i._id}><a className='downLink' href={i.url}><div className='downloadTemp' >{i.filename}</div></a></div>
            )}

    </div>
  )
}

export default DownloadTemplates