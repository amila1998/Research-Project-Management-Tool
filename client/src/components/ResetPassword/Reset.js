import "./reset.scss";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Reset = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };
  const handleClick2 = () => {
    setVisible2(!visible2);
  };

  return (
      <>
      <div className="reset">
            <h1>
                Staff Registration
            </h1>

            <form className="" novalidate>
            <div className="column">
                <label htmlFor="validationCustom05" className="form-label">Password</label>
                <div className="input-group has-validation">
                    <input className="form-control" id="validationCustom05" type={visible ? "text" : "password"}
                        text="Password"
                        required/>
                        <span className="input-group-text" id="validationTooltipUsernamePrepend">
                        <div onClick={handleClick}>{visible ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
                    </div>
                </div>
                <div className="column">
                <label htmlFor="validationCustom05" className="form-label">Confirm Password</label>
                <div className="input-group has-validation">
                    <input className="form-control" id="validationCustom05" type={visible2 ? "text" : "password"}
                        text="Password"
                        required/>
                        <span className="input-group-text" id="validationTooltipUsernamePrepend">
                        <div onClick={handleClick2}>{visible2 ? <MdVisibility /> : <MdVisibilityOff />}</div></span>
                    </div>
                </div>

                <div className="column">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                    <label className="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                    </label>
                    
                    </div>
                </div>
                <div className="column">
                <div className="login_btn">
                    <button type="submit">Reset Password</button>
                </div>
                </div>

            </form>

    </div>
      </>

  );
};

export default Reset;