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
    const [templates,setTemplates]=useState([]);
    const [callback,setCallback]=useState(true);
    const [tempID,setTempID]=useState("");
    const [fileName, setFileName]=useState("");
    

    useEffect(() => {
      const getTemplates=async()=>{
        try {
         if(callback){
          const res = await axios.get('/api/template/getAll');
          console.log(res);
          setCallback(false);
          setTemplates(res.data.templates);
         }       
        } catch (error) {
          console.log(error);
        }
      }
      getTemplates();
    }, [callback])
    console.log(callback);
    

    const onDrop = useCallback((acceptedFiles)=>{
        //console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
    },[])


    const {getRootProps,getInputProps}=useDropzone({
        onDrop,
        multiple:false,
    
    });

    const updateHandler = (id)=>{
      
      setOnEdite(true)
      templates.forEach(temp => {
        
       if(temp._id===id){
         //console.log(temp);
          setTempID(temp._id)
          setfileURL(temp.url);
          setData({...data, title:temp.title,description:temp.description})
          setFileName(temp.filename)
       }
        
      
    })
    }
    

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
            setFileName(file.name)
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
  if (!onEdit) {
    try {
      const res = await axios.post("/api/template/add",{title:data.title,description:data.description,url:fileURL,filename:file.name});
      toast.success(res.data.msg ,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCallback(true);
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
  } else {
    try {
      const res = await axios.post(`/api/template/update/${tempID}`,{title:data.title,description:data.description,url:fileURL,filename:fileName});
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
    setCallback(true);
    setOnEdite(false);
  }
}


const deleteHandler=async(id)=>{
  try {
    const res = await axios.post(`/api/template/delete/${id}`);
    toast.success(res.data.msg ,{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
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
    setCallback(true);
}

    
 

      

  return (
    <div> 
        <ToastContainer/>
      <div className='tempbody'>
        <div className='tempLeft'>
          <h1 className="Tem">{!onEdit?"ADD NEW TEMPLATE":"UPDATE TEMPLATE"}</h1>
          <div className='trow'>
          <div {...getRootProps()} className="tempupload">
            <input  {...getInputProps}  placeholder={file? file.name:"Drag & Drop your file"}/>
          </div>
          {
              fileURL?<><a href={fileURL}>Uploaded File</a></>:<></>
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
      
    
        <div className='trow t_btn'>
        <button className='' onClick={addTemplate}>{onEdit?"Update":"Submit"}</button>
        </div>
      
        </div>
        <div className='tempmid'>
        <div className="vl"></div></div>
        <div className='tempRightt'>
        <h4 className="temp2">You have {templates.length} Templates</h4>

<table>
    <thead>
        <tr>
            <th>Template ID</th>
            <th>Date of Created</th>
            <th>Title</th>
            <th>Format</th>
            <th>Description</th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        {
            templates.map(items => (
                <tr key={items._id}>
                    <td>{items._id}</td>
                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                    <td><a href={items.url}>{items.title}</a></td>
                    <td>{items.filename.split(".")[1]}</td>
                    <td>{items.description}</td>
                    <td><button onClick={()=>updateHandler(items._id)} className='btn btn-outline-warning'>Update</button></td>
                    <td><button onClick={()=>deleteHandler(items._id)} className='btn btn-outline-danger'>Delete</button></td>
                </tr>
            ))
        }
    </tbody>
</table>


        </div>
        
    </div>

    </div>
  )
}

export default UploadTemplates