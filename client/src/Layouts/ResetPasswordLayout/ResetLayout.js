import "./resetlayout.css";
import Reset from "../../components/ResetPassword/Reset";
import { useNavigate } from "react-router-dom";
const ResetLayout = () => {
  const history = useNavigate();
  const handleClick = () => {
    history("/");
  };

  return (
    <div className="authlayout">
      {/* logo */}
      <div className="authlayout_logo">
        <img src={require("../../assets/img/SLIIT_Logo_Crest.png")} alt="logo" />
      </div>
      {/* form */}
      <Reset />
      {/* actions */}
      <p className="reset_p" onClick={handleClick}>
        login ?
      </p>
    </div>
  );
};

export default ResetLayout;