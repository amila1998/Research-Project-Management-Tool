import React, { useState, useEffect } from "react";
import "./markingSchema.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
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
import { event } from "../../Admin/SubmissionTypeManagement/Redux/Axios/event";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty } from "../../helper/validate";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";

const MarkingSchemaManagement = () => {
  const [submissionType, setSubmissionType] = useState("");
  const [idIncrement, setIdIncrement] = useState(1);
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [submissionTypes, setSubmissionTypes] = useState([]);
  const [submissionTypeID, setSubmissionTypeID] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialSchemaData = [
    {
      submissionTypeId: "",
      title: "",
      markingSchema: [
        {
          criteria: "",
          marks: "",
        },
      ],
    },
  ];
  const [markingSchemaData, setMarkingSchema] = useState(initialSchemaData);

  const initialRowState = [{ criteria: "", marks: 0 }];
  const [rows, setRows] = useState(initialRowState);
  const inputArr = [
    [
      {
        type: "text",
        id: 0,
        value: "",
        label: "Criteria",
      },
      {
        type: "number",
        id: 0,
        value: "",
        label: "Marks",
      },
    ],
  ];

  const [arr, setArr] = useState(inputArr);

  const getSubmissionTypes = async () => {
    try {
      const result = await event.get(`/`);
      console.log("🚀 ~ ----- ~ getSubmissionTypes ~ result", result);
      const resultArray = result.data;
      let tempArray = [];
      resultArray.length > 0 &&
        resultArray.map((types) => {
          tempArray.push({ value: types._id, label: types.title });
        });
      setSubmissionTypes(tempArray);
    } catch (error) {
      console.log("🚀 ~ ----- ~ getSubmissionTypes ~ error", error);
    }
  };
  useEffect(() => {
    getSubmissionTypes();
  }, []);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        [
          { type: "text", id: idIncrement, value: "", label: "Criteria" },
          { type: "number", id: idIncrement, value: "", label: "Marks" },
        ],
      ];
    });
    setIdIncrement(idIncrement + 1);
  };

  const preview = () => {
    createData();
    setPreviewEnabled(!previewEnabled);
  };

  const onClickUpdate = () => {
    console.log("🚀 ~~ arr", arr);
    console.log("🚀 ~~ rows", rows);
    createData();
  };

  const setMarkingSchemaData = () => {
    setMarkingSchema({
      ...markingSchemaData,
      submissionTypeId: submissionTypeID,
      title: title,
      markingSchema: rows,
    });
  };

  const onClickSave = async (e) => {
    e.preventDefault();
    setMarkingSchemaData();
    // check fields
    if (
      isEmpty(title) ||
      isEmpty(submissionTypeID)
    )
      return toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    try {
      setIsLoading(true);
      const res = await axios.post("/api/schema/add", markingSchemaData);
      console.log("🚀 ~~ markingSchemaData", markingSchemaData)
      console.log("🚀 ~~ handleSubmit ~ res", res);
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
      console.log("🚀 ~~ handleSubmit ~ err", err);
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

  const handleInputChange = (e, key) => {
    e.preventDefault();
    arr.map((arraySet) => {
      arraySet.map((dataset) => {
        if (dataset.id == key && dataset.label == e.target.name) {
          dataset.value = e.target.value;
        }
      });
    });
  };

  const createData = () => {
    let rowArray = [];
    arr.map((arraySet) => {
      let criteria = "";
      let marks = 0;
      arraySet.map((dataset) => {
        if (dataset.label === "Criteria") {
          criteria = dataset.value;
        }
        if (dataset.label === "Marks") {
          marks = dataset.value;
        }
      });
      rowArray.push({ criteria: criteria, marks: marks });
    });
    setRows(rowArray);
  };

  const handleChange = (e) => {
    setSubmissionTypeID(e.target.value);
  };

  const handleTitleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const getTotalMarkAllocation = () => {
    let total = 0;
    rows.length > 0 &&
      rows.map((row) => {
        total = total + Number(row.marks);
      });
    return total;
  };

  // const rowsData = [
  //   { criteria: "SRS Document", marks: 10 },
  //   { criteria: "Frontend Development", marks: 25 },
  //   { criteria: "Backend Development", marks: 25 },
  //   { criteria: "Maintaining the Codebase", marks: 10 },
  //   { criteria: "Both Frontend and Backend are hosted", marks: 10 },
  //   { criteria: "Unit Tests", marks: 10 },
  // ];

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
              <form >
                <InputLabel id="demo-simple-select-helper-label">
                    Submission Type
                  </InputLabel>
                  <Select
                    id="outlined-basic"
                    label="-"
                    displayEmpty
                    onChange={handleChange}
                    autoWidth
                    sx={{ minWidth: 215,margin: 1 }}
                  >
                    {submissionTypes.map((type) => (
                      <MenuItem value={type.value}>{type.label}</MenuItem>
                    ))}
                  </Select>
                <Divider />
                <InputLabel id="demo-simple-select-helper-label">
                  Title
                </InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  label="Title"
                  defaultValue={title}
                  onChange={handleTitleInputChange}
                />
                <Divider />
                <InputLabel id="demo-simple-select-helper-label">
                  Marking Schema Details
                </InputLabel>
                {arr.map((items, i) => (
                  <>
                    {items.map((item) => (
                      <TextField
                        required
                        id="outlined-basic"
                        name={item.label}
                        label={item.label}
                        defaultValue={item.value}
                        type={item.type}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    ))}
                    <br />
                  </>
                ))}
                <Divider />
                <div className="marking-schema-row">
                  <div className="add-button">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        addInput();
                      }}
                    >
                      Add another field
                    </Button>
                  </div>
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
                      onClickSave(e);
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
                <h4>Marking Schema Preview</h4>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">No</TableCell>
                        <TableCell align="left">Criteria</TableCell>
                        <TableCell align="right">
                          Marking Distribution
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length > 0 &&
                        rows.map((row, i) => (
                          <TableRow
                            key={row.criteria}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">{i + 1}</TableCell>
                            <TableCell align="left">{row.criteria}</TableCell>
                            <TableCell align="right">{row.marks}</TableCell>
                          </TableRow>
                        ))}
                      <TableRow
                        key="total"
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">Total</TableCell>
                        <TableCell align="right">
                          {getTotalMarkAllocation()}
                        </TableCell>
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

export default MarkingSchemaManagement;
