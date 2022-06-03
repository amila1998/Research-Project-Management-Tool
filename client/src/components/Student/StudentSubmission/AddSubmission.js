import { useContext,useCallback, useState,useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import {useDropzone} from 'react-dropzone'
import "./addSubmission.scss"
import axios from "axios";



import { styled } from "@mui/material";
import Button from '@mui/material/Button';

const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    color: "#000000",
    borderColor: "#ff6a06",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#ff6a06",
      borderColor: "#ff6a06",
      boxShadow: "none",
    },
  });







export const AddSubmission = ({eventtype,eventName,eventId,setsubId}) => {
console.log("🚀 ~ file: AddSubmission.js ~ line 8 ~ AddSubmission ~ eventtype", eventtype)
// console.log("🚀 ~ file: AddSubmission.js ~ line 8 ~ AddSubmission ~ eventId", eventId)
    const {dispatch, user } = useContext(AuthContext);
    const [fileName, setFileName]=useState("");
    const [file, setFile] = useState(false);
    const [fileURL, setfileURL] = useState('');
    const[groupId,setGroupId]=useState([]);
    console.log("🚀 ~ file: AddSubmission.js ~ line 15 ~ AddSubmission ~ groupId", groupId)
   

    const[isSubmitted,setisSubmitted]=useState(true)
    const [data,setData]=useState({
        comments:''
      });



    const onDrop = useCallback((acceptedFiles)=>{
        console.log('acceptedFiles',acceptedFiles);
        setFile(acceptedFiles[0]);
    },[])
    const {isDragActive, getRootProps, getInputProps} = useDropzone({
        onDrop,
        multiple:false,
    });
 
   useEffect(()=>{
   const getGroupId=async()=>{
        axios.get(`http://localhost:8000/api/group/getStutendGroup/${user._id}`).then((res)=>{
            // console.log(res);
            setGroupId(res.data.submssion);
        }).catch((err)=>{
            alert(err.massage);
        })
    }
    getGroupId();
   },[])

//    console.log(groupId._id)

    useEffect(() => {
        console.log('file', file)
        if (file?.name) {
            const handleUpload = async () => {
                const formData = new FormData();
                formData.append("studentSubmssion", file)
                try {
                    const uploadRes = await axios.post("/api/addsubmission", formData, {
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


//Submition part
const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  

   const addSubmition=async(e)=>{
    // e.preventDefault();
    try {
        const res = await axios.post("/api/submssion/add",{studentId:user.username,groupID:groupId._id,groupName:groupId.groupName,eventId:eventId,eventName:eventName,eventType:eventtype,comments:data.comments,url:fileURL,isSubmitted:isSubmitted});
        toast.success(res.data.msg ,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setsubId(res.data.submitid);
        // setsubId("test");

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
        {/* AddSubmission component */}
        
          <form>
              <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">Student Name</label>
                  <input type="text" id="disabledTextInput" class="form-control" placeholder={user.name} />
              </div>
              <div class="mb-3">
                  <label for="disabledTextInput" class="form-label">student ID</label>
                  <input type="text" id="disabledTextInput" class="form-control" placeholder={user.username} />
              </div>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Add comments</label>
                  <input 
                   type="text" 
                   class="form-control" 
                   value={data.comments}
                   name='comments'
                   required
                   onChange={handleChange}
                   />
              </div>  
              <div className='trow'>
                  <div {...getRootProps()} className="tempupload">
                      <input  {...getInputProps} placeholder={file ? file.name : "Drag & Drop your file"} />
                  </div>
                  {
                      fileURL ? <><a href={fileURL}>Uploaded File</a></> : <></>
                  }
              </div>
              <BootstrapButton onClick={addSubmition}>Submit</BootstrapButton>
          </form>


    </div>
  )
}
