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

const EvaluateSubmission = () => {
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
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [rows, setRows] = useState(initialRowState);
  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [submissionTypeID, setSubmissionTypeID] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(false);
  const [markingSchemaData, setMarkingSchemaData] = useState([]);
  const [markingSchemaArray, setMarkingSchema] = useState([]);
  const [evaluationData, setEvaluationData] = useState(initialEvaluationDataState);
  const [totalMark, setTotalMark] = useState(0);
  const [groupId, setGroupId] = useState("");

  const {
    _id: submissionTypeId,
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

  const handleInputChange = (e, key) => {
    setCallback(true);
    arr.map((arraySet) => {
      arraySet.map((dataset) => {
        if (dataset.id == key && dataset.label == e.target.name) {
          dataset.value = e.target.value;
        }
      });
    });
  };

  useEffect(() => {}, [arr, submissionTypes, markingSchemaData]);

  useEffect(() => {
    setMarkingSchemaForm();
  }, [markingSchemaArray]);

  useEffect(() => {
    createData();
  }, [arr]);

  useEffect(() => {
    setMarkingSchema(markingSchema);
  }, [markingSchema]);

  useEffect(() => {
    console.log("🚀 ~  ~ evaluationData", evaluationData)
  }, [evaluationData]);

  useEffect(() => {
    // console.log("🚀 ~~ arr ", arr);
    // console.log("🚀 ~~ rows ", rows);
    setCallback(false);
  }, [callback]);

  useEffect(() => {
    // console.log("🚀 ~~ rows ", rows);
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

  // const handleChange = (e) => {
  //   setSubmissionType(e.target.value);
  // };

  const onChangeSwitch = (e) => {
    setIsBlindReviewer(e.target.checked);
  };

  const getSubmissionTypes = async () => {
    try {
      const result = await axios.get(
        `/api/schema/get/629284dcf00425624e57a3e2`
      );
      console.log("getSubmissionTypes ~ result", result);
      setMarkingSchemaData(result.data.markingSchema);
      setSubmissionTypes(result.data.submissionData);
      setGroupId("62922bcfaa5145fa58dee82e")
    } catch (error) {
      console.log("getSubmissionTypes ~ error", error);
    }
  };

  useEffect(() => {
    getSubmissionTypes();
  }, []);

  useEffect(() => {
    sendEvaluation();
  }, [evaluationData]);

  const preview = () => {
    let total = getTotalMarkAllocation();
    createData();
    setTotalMark(total);
    setPreviewEnabled(!previewEnabled);
  };

  const onClickUpdate = () => {
    let total = getTotalMarkAllocation();
    createData();
    setTotalMark(total);
  };
  const sendEvaluation = async () => {
    // check fields
    // if (isEmpty(title) || isEmpty(submissionTypeID))
    //   return toast.error("Please fill in all fields.", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    try {
      console.log("🚀 ~~ evaluationData", evaluationData)
      setIsLoading(true);
      const res = await axios.post("/api/evaluation/add", evaluationData);     
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
  };

  const onClickEvaluate = async (e) => {
    e.preventDefault();
    setEvaluationData({
      ...evaluationData,
      submissionTypeId: submissionTypeId,
      groupId: groupId,
      evaluatorId: user._id,
      marks: totalMark,
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
            <h3>Create Marking Schema</h3>
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
                  <FormControlLabel
                    control={<Switch onChange={(e) => onChangeSwitch(e)} />}
                    label="Blind Reviewer"
                  />
                  <Divider />
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
                        variant="outlined"
                        onClick={() => {
                          onClickUpdate();
                        }}
                      >
                        Update
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

export default EvaluateSubmission;
