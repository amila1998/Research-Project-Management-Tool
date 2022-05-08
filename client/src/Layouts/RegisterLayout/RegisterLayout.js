import { useState, useEffect } from "react";
import "./registerLayout.scss";
import StudentRegister from "../../components/Register/StudentRegister/Register";
import StaffRegister from "../../components/Register/StaffRegister/Register";


const Register = () => {
 
  const [StudentReg, setStudentReg] = useState(true);
  const [StaffReg, setStaffReg] = useState(false);

  useEffect(() => {
    if(StudentReg){
        document.getElementById("btnstd").style.backgroundColor = "#FF7800";
        document.getElementById("btnstaff").style.backgroundColor = "white";
        document.getElementById("btnstaff").style.color = "gray";
        document.getElementById("btnstd").style.color = "black";
      }
    if (StaffReg) {
        document.getElementById("btnstaff").style.backgroundColor = "#FF7800";
        document.getElementById("btnstd").style.backgroundColor = "white";
        document.getElementById("btnstaff").style.color = "black";
        document.getElementById("btnstd").style.color = "gray";
    }
  });

  const handlestaffReg=()=>{
    setStudentReg(false);
    setStaffReg(true);
  };
  const handleStdReg=()=>{
    setStudentReg(true);
    setStaffReg(false);
};

   
  return (
    <>
    <div><h1>Registration</h1></div>
    <div className="rolebuttons">
        <div className="stdbtn" id="btnstd"   onClick={handleStdReg}>I am Student</div>
        <div className="staffbtn" id="btnstaff"   onClick={handlestaffReg}>I am Staff</div>
    </div>
    {StudentReg&&<StudentRegister/>}
    {StaffReg&&<StaffRegister/>}
    </>
  );
};

export default Register;