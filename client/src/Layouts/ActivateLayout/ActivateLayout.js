import { Link, useParams } from "react-router-dom";
import "./activatelayout.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

import Loading from "../../components/Loading/Loading";

const ActivateLayout = ({ history }) => {
  const [isLoading, setisLoading]=useState(false);

  const { activation_token } = useParams();
  //console.log(activation_token);

  useEffect(() => {
    // check token
    if (activation_token) {
      const activateUser = async () => {
        try {
          setisLoading(true);
          const res = await axios.post("http://localhost:8000/api/auth/activation", {
            activation_token,
          });
          
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setisLoading(false);
        } catch (err) {
          setisLoading(false);
          console.log(err);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      };
      activateUser();
    }
  }, [activation_token]);

 


  return (
    <div className="activate">
      {isLoading ? <Loading/>:
      <p>
        ready to login ? 👉🏻 <Link to={"/"}>Here</Link>
      </p>}
      
    </div>
  );
};

export default ActivateLayout;