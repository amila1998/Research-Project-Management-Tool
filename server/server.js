const express = require("express");
const mongoose = require("mongoose");

const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

//set up server
app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));


//Connect to Mongo DB
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},(err)=>{
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
})