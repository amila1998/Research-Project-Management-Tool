import React, { useState,useCallback, useEffect } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDropzone} from 'react-dropzone'
import './uploadtemplates.scss';

axios.defaults.withCredentials = true;

const UploadTemplates = () => {

    const [file, setFile] = useState(false);
    const [fileURL, setfileURL] = useState('');
    const [onEdit,setOnEdite]=useState(false);
    const [data,setData]=useState({
      title:"",description:""
    });

    const onDrop = useCallback((acceptedFiles)=>{
        //console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    },[])


    const {getRootProps,getInputProps}=useDropzone({
        onDrop,
        multiple:false,
    
    });

  useEffect(() => {
    if (file?.name) {
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
            toast.success(uploadRes.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setfileURL(uploadRes.data.url);
        } catch (error) {
          console.log(error);
          setfileURL(null)
        }
    }
    handleUpload();
      
    }
  }, [file])
  


const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
};


const addTemplate = async()=>{
  try {
    const res = await axios.post("/api/template/add",{title:data.title,description:data.description,url:fileURL});
    toast.success(res.data.msg ,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setData({title:"",description:''});
    setfileURL('');
    setFile(null);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message ,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    
  }

}

    
 

      

  return (
    <div> 
        <ToastContainer/>
      <div className='tempbody'>
        <div className='tempLeft'>
          <h1>{!onEdit?"ADD NEW TEMPLATE":"UPDATE TEMPLATE"}</h1>
          <div className='trow'>
          <div {...getRootProps()} className="tempupload">
            <input  {...getInputProps}  placeholder={file? file.name:"Drag & Drop your file"}/>
          </div>
          {
              fileURL?<><a href={fileURL}>{file?.name}</a></>:<></>
          }
        </div>
        <br/>
        
        <div className='trow'>
          <input 
          type='text'
          className='tinput'
          name='title'
          required
          value={data.title}
          onChange={handleChange}
          placeholder='Enter Template Title...'/>
        </div>

        <div className='trow'>
          <textarea 
          type='textarea'
          className='tinput'
          name='description'
          value={data.description}
          onChange={handleChange}
          required
          placeholder='Enter Template Description...'/>
        </div>
      
    
        <div className='trow'>
        <button className='' onClick={addTemplate}>{onEdit?"Update":"Submit"}</button>
        </div>
      
        </div>
        <div className='tempRightt'></div>
        
    </div>

    </div>
  )
}

export default UploadTemplates