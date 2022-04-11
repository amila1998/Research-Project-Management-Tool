const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const { connect } = require("mongoose");
const { success, error } = require("consola");




// Bring in the app constants
const { DB, PORT,ORIGING_URL } = require("./config");

// Initialize the application
const app = express();

// Middlewares
app.use(cors({
  origin:ORIGING_URL,
}));
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);





const startApp = async () => {
    try {
      // Connection With DB
      await connect(DB, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //useFindAndModify: true,
      });
  
      success({
        message: `Successfully connected with the Database \n${DB}`,
        badge: true
      });
  
      // Start Listenting for the server on PORT
      app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, badge: true })
      );
    } catch (err) {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: true
      });
      startApp();
    }
  };
  
  startApp();