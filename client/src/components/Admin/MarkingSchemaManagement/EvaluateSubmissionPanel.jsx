import React, { useState, useEffect,useContext } from "react";
import "./markingSchema.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { event } from "../../Admin/SubmissionTypeManagement/Redux/Axios/event";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty } from "../../helper/validate";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { AuthContext } from "../../../context/AuthContext";

const EvaluateSubmissionPanel = ({groupID,eventId}) => {
console.log("🚀 ~ file: EvaluateSubmission.jsx ~ line 32 ~ EvaluateSubmission ~ groupID", groupID)
console.log("🚀 ~ file: EvaluateSubmission.jsx ~ line 32 ~ EvaluateSubmission ~ eventId",eventId)
// const EvaluateSubmission = (data) => {
  // const {groupId,submissionTypeId} = data;
  const groupId=groupID;
  const submissionTypeId=eventId;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const initialRowState = [{ criteria: "", marks: 0, comment: "" }];
  const initialEvaluationDataState = [
    {
      submissionTypeId: "",
      groupId: "",
      evaluatorId: "",
      marks: 0,
      isBlindReviewed: false,
      result: [
        {
          criteria: "",
          comment: "",
          marks: 0,
        },
      ],
    },
  ];
  const [arr, setArr] = useState([]);
  const [isBlindReviewer, setIsBlindReviewer] = useState(false);
  const [isSecondEvaluation, setIsSecondEvaluation] = useState(false);
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [rows, setRows] = useState(initialRowState);
  const [submissionTypes, setSubmissionTypes] = useState([]);
  // const [submissionTypeID, setSubmissionTypeID] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [markingSchemaData, setMarkingSchemaData] = useState([]);
  const [markingSchemaArray, setMarkingSchema] = useState([]);
  const [markingSchemaUpdatedArray, setUpdatedMarkingSchema] = useState([]);
  const [evaluationData, setEvaluationData] = useState(initialEvaluationDataState);
  const [totalMark, setTotalMark] = useState(0);
  const [level, setLevel] = useState(0);
  // const [groupId, setGroupId] = useState("");
  const [evaluationLevel, setEvaluationLevel] = useState(0);
  const [evaluationId, setEvaluationId] = useState("");

  const {
    describe: description,
    title: submissionTypeTitle,
  } = submissionTypes;

  const {
    _id: markingSchemaId,
    markingSchema,
    title: markingSchemaTitle,
  } = markingSchemaData;

  const setMarkingSchemaForm = () => {
    let tempSchema = [];
    markingSchemaArray?.length > 0 &&
      markingSchemaArray.map((data, i) => {
        tempSchema.push([
          {
            type: "text",
            id: i,
            value: data.criteria,
            label: "Criteria",
          },
          { type: "text", id: i, value: "", label: "Comment" },
          {
            type: "number",
            id: i,
            value: "",
            label: "Marks",
          },
        ]);
      });
    setArr(tempSchema);
  };

  const setMarkingSchemaUpdatedForm = () => {
    let tempSchema = [];
    markingSchemaUpdatedArray?.length > 0 &&
      markingSchemaUpdatedArray.map((data, i) => {
        tempSchema.push([
          {
            type: "text", id: i, value: data.criteria, label: "Criteria",
          },
          { type: "text", id: i, value: data.comment, label: "Comment" },
          {
            type: "number", id: i, value: data.marks, label: "Marks",
          },
        ]);
      });
    setArr(tempSchema);
  };

  const handleInputChange = (e, key) => {
    setCallback(true);
    arr.map((arraySet) => {
      arraySet.map((dataset) => {
        if (dataset.id == key && dataset.label == e.target.name) {
          dataset.value = e.target.value;
        }
      });
    });
    createData();
  };

  useEffect(() => {}, [arr, submissionTypes, markingSchemaData]);

  useEffect(() => {
    setMarkingSchemaForm();
  }, [markingSchemaArray]);

  useEffect(() => {
    setMarkingSchemaUpdatedForm();
  }, [markingSchemaUpdatedArray]);

  useEffect(() => {
    console.log("🚀 ~  ~ evaluationData", evaluationData)
  }, [evaluationData]);

  useEffect(() => {
    // console.log("🚀 ~~ arr ", arr);
    // console.log("🚀 ~~ rows ", rows);
    setCallback(false);
  }, [callback]);

  useEffect(() => {
    let total = getTotalMarkAllocation();
    setTotalMark(total);
  }, [rows]);

  const createData = () => {
    let rowArray = [];
    arr.map((arraySet) => {
      let criteria = "";
      let comment = "";
      let marks = 0;
      arraySet.map((dataset) => {
        if (dataset.label === "Criteria") {
          criteria = dataset.value;
        }
        if (dataset.label === "Comment") {
          comment = dataset.value;
        }
        if (dataset.label === "Marks") {
          marks = dataset.value;
        }
      });
      rowArray.push({ criteria: criteria, marks: marks, comment: comment });
    });
    setRows(rowArray);
  };

  const onChangeSwitch = (e) => {
    setIsBlindReviewer(e.target.checked);
  };

  const getSubmissionTypes = async () => {
    try {
      const result = await axios.get(
        `/api/schema/get/${submissionTypeId}`
      );
        console.log("🚀 ~ file: EvaluateSubmission.jsx ~ line 196 ~ getSubmissionTypes ~ submissionTypeId", submissionTypeId)
      console.log("getSubmissionTypes ~ result", result);
      setMarkingSchemaData(result.data.markingSchema);
      setMarkingSchema(result.data.markingSchema.markingSchema);
      setSubmissionTypes(result.data.submissionData);
    } catch (error) {
      toast.error("This submission has no marking schema please add one", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("getSubmissionTypes ~ error", error);
    }
  };

  const getEvaluationValue = async () => {
    try {
      const result = await axios.post(
        `/api/evaluation/panel/getLevel/`,
        {submissionTypeId,
        groupId}
      );
      console.log("getEvaluationValue ~ result", result);
      if (result.data.success) {
        setEvaluationLevel(result.data.evaluation.level);        
        setLevel(result.data.evaluation.level);        
        setUpdatedMarkingSchema(result.data.evaluation.result);        
        setEvaluationId(result.data.evaluation._id);     
        setIsSecondEvaluation(true);      
      }
    } catch (error) {
      if (!result.data.success) {
        setEvaluationLevel(0);
        setLevel(0);     
      }
      console.log("getEvaluationValue ~ error", error);
    }
  };

  useEffect(() => {
    getEvaluationValue();
  }, []);

  useEffect(() => {
    getSubmissionTypes();
  }, []);

  useEffect(() => {
    sendEvaluation();
  }, [evaluationData]);

  const preview = () => {
    createData();
    setPreviewEnabled(!previewEnabled);
  };

  const sendEvaluation = async () => {
    if (isSecondEvaluation) {
      try {
        console.log("🚀 ~~ evaluationData", evaluationData)
        setIsLoading(true);
        const res = await axios.post(`/api/evaluation/panel/update/${evaluationId}`, evaluationData);     
        console.log("🚀 ~  ~ onClickEvaluate ~ res", res)
        setIsLoading(false);
  
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      } catch (err) {
        console.log("🚀 ~ ~ onClickEvaluate ~ err", err)
        console.log("🚀 ~~ evaluationData", evaluationData)
        setIsLoading(false);
        toast.error(err.response.data.msg, {
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
        console.log("🚀 ~~ evaluationData", evaluationData)
        setIsLoading(true);
        const res = await axios.post("/api/evaluation/panel/add", evaluationData);     
        console.log("🚀 ~  ~ onClickEvaluate ~ res", res)
        setIsLoading(false);
  
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      } catch (err) {
        console.log("🚀 ~ ~ onClickEvaluate ~ err", err)
        console.log("🚀 ~~ evaluationData", evaluationData)
        setIsLoading(false);
        toast.error(err.response.data.msg, {
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
  };

  const onClickEvaluate = async (e) => {
    e.preventDefault();
    setEvaluationData({
      ...evaluationData,
      submissionTypeId: submissionTypeId,
      groupId: groupId,
      evaluatorId: user._id,
      marks: totalMark,
      level: level,
      isBlindReviewed: isBlindReviewer,
      result: rows,
    });
  };

  const getTotalMarkAllocation = () => {
    let total = 0;
    rows.length > 0 &&
      rows.map((row) => {
        total = total + Number(row.marks);
      });
    return total;
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ToastContainer />
          <div className="markingSchema">
            <h3>Submission Evaluation</h3>
              <div>Evaluation Level {evaluationLevel+1}</div>
              <div className='steps'>
                <span className="line-1"></span>
                <span className="line-2"></span>
                {evaluationLevel === 0 && <><div className='nextStep'>Initial Evaluation</div></>}
                {evaluationLevel === 1 && <><div className='nextStep'>Second Evaluation</div></>}
                
              </div>
              <br></br>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <form>
                  <InputLabel id="demo-simple-select-helper-label">
                    Submission Type
                  </InputLabel>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {submissionTypeTitle}
                  </Typography>
                  <Divider />
                  <InputLabel id="demo-simple-select-helper-label">
                    Used marking Schema
                  </InputLabel>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    {markingSchemaTitle}
                  </Typography>
                  <Divider />
                  <InputLabel id="demo-simple-select-helper-label">
                    Group ID
                  </InputLabel>
                  <Typography variant="subtitle1" gutterBottom component="div">
                  {groupId}
                  </Typography>
                  <Divider />
                    {level === 1 && <>
                      <FormControlLabel
                        control={<Switch onChange={(e) => onChangeSwitch(e)} />}
                        label="Blind Reviewer"
                      />
                      <Divider /></>}
                  <InputLabel id="demo-simple-select-helper-label">
                    Evaluation
                  </InputLabel>
                  {arr?.length > 0 &&
                    arr.map((items, i) => (
                      <>
                        {items.map((item, index) =>
                          index == 0 ? (
                            <InputLabel id="demo-simple-select-helper-label">
                              {item.label} : {item.value}
                            </InputLabel>
                          ) : (
                            <TextField
                              required
                              id="outlined-basic"
                              type={item.type}
                              name={item.label}
                              label={item.label}
                              defaultValue={item.value}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          )
                        )}
                        <br />
                      </>
                    ))}
                  <Divider />
                  <div className="marking-schema-row">
                    <div className="marking-schema-column">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          preview();
                        }}
                        size="medium"
                      >
                        Preview
                      </Button>
                      &nbsp;
                      <Button
                        type="submit"
                        variant="outlined"
                        onClick={(e) => {
                          onClickEvaluate(e);
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                  <Divider />
                </form>
              </div>
            </Box>
            {previewEnabled && (
              <>
                <h4>Result Preview</h4>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">No</TableCell>
                        <TableCell align="left">Criteria</TableCell>
                        <TableCell align="left">Comments</TableCell>
                        <TableCell align="right">
                          Marking Distribution
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length > 0 &&
                        rows.map((row, i) => (
                          <TableRow
                            key={1000 + i}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">{i + 1}</TableCell>
                            <TableCell align="left">{row.criteria}</TableCell>
                            <TableCell align="left">{row.comment}</TableCell>
                            <TableCell align="right">{row.marks}</TableCell>
                          </TableRow>
                        ))}
                      <TableRow
                        key="total"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">Total</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="right">{totalMark}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EvaluateSubmissionPanel;
