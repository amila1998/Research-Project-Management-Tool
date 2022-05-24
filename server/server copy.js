const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require('cors');

// db
const URL = process.env.MONGODB_URL;

mongoose.connect(URL,err => {
    if(err) throw err;
    console.log('connected to MongoDB')
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongodb Connection Success!");
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log("server is active");
});


// mw
app.use(cors({
  origin:"http://localhost:3000",
}));
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
// routes

app.use(uploadRoutes);
app.use(userRoutes);