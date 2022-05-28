import React, { useState, useEffect } from "react";
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

const EvaluateSubmission = () => {
  const [submissionType, setSubmissionType] = useState("");
  const [idIncrement, setIdIncrement] = useState(1);
  const [previewEnabled, setPreviewEnabled] = useState(false);
  const [rows, setRows] = useState(initialRowState);

  const initialRowState = [{ criteria: "", marks: 0 }];
  const inputArr = [
    [
      {
        type: "text",
        id: 0,
        value: "",
        label: "Criteria",
      },
      {
        type: "text",
        id: 0,
        value: "",
        label: "Comment",
      },
      {
        type: "text",
        id: 0,
        value: "",
        label: "Marks",
      },
    ],
  ];

  const [arr, setArr] = useState(inputArr);

//   const addInput = () => {
//     setArr((s) => {
//       return [
//         ...s,
//         [
//           { type: "text", id: idIncrement, value: "", label: "Criteria" },
//           { type: "text", id: idIncrement, value: "", label: "Comment" },
//           { type: "text", id: idIncrement, value: "", label: "Marks" },
//         ],
//       ];
//     });
//     setIdIncrement(idIncrement + 1);
//   };

  const preview = () => {
    createData();
    setPreviewEnabled(!previewEnabled);
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

  useEffect(() => {
    console.log("🚀 ~~ arr", arr);
    console.log("🚀 ~~ rowData", rowsData);
  }, [arr]);

  const createData = () => {
    let rowArray =[];
    arr.map((arraySet) => {      
      arraySet.map((dataset) => {
        let criteria = "";
        let marks = 0;
        if (dataset.label === "Criteria") {
          criteria = dataset.value;
        }
        if (dataset.label === "Marks") {
          marks = dataset.value;
        }
        rowArray.push({ criteria: criteria, marks: marks });
      });
    });
    // setRows({ ...rows, rowArray });
    // rowsData = rowArray;
  };

  const handleChange = (e) => {
    setSubmissionType(e.target.value);
  };

  const submissionTypeOptions = [
    { value: "Submission Type 1", label: "Submission Type 1" },
    { value: "Submission Type 2", label: "Submission Type 2" },
    { value: "Submission Type 3", label: "Submission Type 3" },
    { value: "Submission Type 4", label: "Submission Type 4" },
    { value: "Submission Type 5", label: "Submission Type 5" },
  ];


  const rowsData = [
    { criteria: "SRS Document", marks: 10 },
    { criteria: "Frontend Development", marks: 25 },
    { criteria: "Backend Development", marks: 25 },
    { criteria: "Maintaining the Codebase", marks: 10 },
    { criteria: "Both Frontend and Backend are hosted", marks: 10 },
    { criteria: "Unit Tests", marks: 10 },
  ];

  return (
    <div className="markingSchema">
      <h1>Marking Schema Management</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Submission Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={submissionType}
            label="Submission Type"
            onChange={handleChange}
            autoWidth
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {submissionTypeOptions.map((type) => (
              <MenuItem value={type.value}>{type.label}</MenuItem>
            ))}
          </Select>
          <FormHelperText>helper text</FormHelperText>
        </FormControl>
        <div>
          <Divider />
          {arr.map((items, key) => (
            <>
              {items.map((item) => (
                <TextField
                  required
                  id="outlined-basic"
                  name={item.label}
                  label={item.label}
                  defaultValue={item.value}
                  onChange={(e) => handleInputChange(e, key)}
                />
              ))}
              <Divider />
            </>
          ))}
          <Divider />
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                addInput();
              }}
            >
              Add another field
            </Button>
          </div>
          <div>
            <Button
              variant="outlined"
              onClick={() => {
                preview();
              }}
            >
              Preview
            </Button>
          </div>
        </div>
      </Box>
      {previewEnabled && 
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">No</TableCell>
                <TableCell align="left">Criteria</TableCell>
                <TableCell align="right">Marking Distribution</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={row.criteria}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{i + 1}</TableCell>
                  <TableCell align="left">{row.criteria}</TableCell>
                  <TableCell align="right">{row.marks}</TableCell>
                </TableRow>
              ))}
              <TableRow
                key="total"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left"></TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="right">100</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </>
       }
    </div>
  );
};

export default EvaluateSubmission;
