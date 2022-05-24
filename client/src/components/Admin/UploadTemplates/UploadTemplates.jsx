import React, { useState,useCallback, useEffect } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDropzone} from 'react-dropzone'

axios.defaults.withCredentials = true;

const UploadTemplates = () => {

    const [file, setFile] = useState(false);

    const onDrop = useCallback((acceptedFiles)=>{
        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    },[])


    const {getRootProps,getInputProps}=useDropzone({
        onDrop,
        multiple:false,
    
    });

  const handleUpload= async()=>{
      const formData = new FormData();
      formData.append("myFile",file)
      try {
          const uploadRes=await axios.post("/api/fileupload", formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
            onUploadProgress: (x) => {
              if (x.total < 1024000)
                return toast("Uploading", {
                  className: "bg-upload",
                  bodyClassName: "bg-upload",
                  autoClose: 7000,
                });
            },
          });
          console.log(uploadRes);
          
      } catch (error) {
        console.log(error);
      }
  }
    
 

      

  return (
    <div> 
        <ToastContainer/>
      <div>
        <div {...getRootProps()}>
            <input {...getInputProps}  placeholder={file? file.name:"Drag & Drop your file"}/>
          

        </div>
        {
            file?.name
        }
        <button onClick={handleUpload}>Button</button>
    </div>

    </div>
  )
}

export default UploadTemplates