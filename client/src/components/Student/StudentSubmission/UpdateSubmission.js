import axios from 'axios';
import { useContext,useCallback, useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import {useDropzone} from 'react-dropzone'
import "./addSubmission.scss"



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


export const UpdateSubmission = ({subId}) => {
// console.log("🚀 ~ file: UpdateSubmission.js ~ line 4 ~ UpdateSubmission ~ subId", subId)
const {dispatch, user } = useContext(AuthContext);  
const [getSubmission,setGetSubmission]=useState(); 
const [fileName, setFileName]=useState("");
const [file, setFile] = useState(false);
const [fileURL,setfileURL] = useState('');
console.log("🚀 ~ file: UpdateSubmission.js ~ line 13 ~ UpdateSubmission ~ fileURL", fileURL)
const [data,setData]=useState({
    comments:''
  });

  console.log("🚀 ~ file: UpdateSubmission.js ~ line 7 ~ UpdateSubmission ~ getSubmission", getSubmission?._id)

   //get submission data
    useEffect(() => {
        const getSubmission = async () => {
            await axios.get(`/api/submssion/getOne/${subId}`).then((res) => {
                // console.log(res);
                setGetSubmission(res.data.submssion);
            }).catch((err) => {
                console.log("🚀 ~ file: Uploadedone.js ~ line 40 ~ axios.get ~ err", err)
            })
        }
        getSubmission();
    }, [])
    

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
      
    //File upload part
     const onDrop = useCallback((acceptedFiles) => {
        console.log('acceptedFiles', acceptedFiles);
        setFile(acceptedFiles[0]);
    }, [])
    const { isDragActive, getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
    });

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

    //update submission
    const updateSubmission=async(e)=>{
        // e.preventDefault();
        try {
            const res = await axios.put(`/api/submssion/updateSubmssion/${getSubmission?._id}`,{
                studentId:user.username,
                groupID:getSubmission?.groupID,
                groupName:getSubmission?.groupName,
                eventId:getSubmission?.eventId,
                eventName:getSubmission?.eventName,
                eventType:getSubmission?.eventtype,
                comments:data.comments,
                url:fileURL,
                isSubmitted:getSubmission?.isSubmitted
            });
            toast.success(res.data.msg ,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setsubId(res.data.submitid);
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
    <div>UpdateSubmission

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
                   placeholder={`${getSubmission?.comments}`}
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
              <BootstrapButton onClick={updateSubmission}> Update Submit</BootstrapButton>
          </form>



    </div>
  )
}
