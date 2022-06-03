const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const { connect } = require("mongoose");
const { success, error } = require("consola");

const socket = require("socket.io");




// Bring in the app constants
const { DB, PORT,ORIGING_URL } = require("./config");

// Initialize the application
const app = express();

// Middlewares
app.use(cors({
  credentials:true,
  origin:true,
}));
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

const groupRoutes = require("./routes/groupRoutes");
app.use(groupRoutes);

const uploadRoutes = require("./routes/uploadRoutes");
app.use(uploadRoutes);

const templateUploadRoutes = require("./routes/templateUploadRouter");
app.use(templateUploadRoutes);

const StudentSubmssionRoutes = require("./routes/StudentSubmssionRoutes");
app.use(StudentSubmssionRoutes);

const templateRoutes = require("./routes/templateRouter");
app.use(templateRoutes);

const submssionRouter = require("./routes/submssionRouter");
app.use(submssionRouter);

const topicEvaluationPanalRoutes = require("./routes/topicEvaluationPanalRoutes");
app.use(topicEvaluationPanalRoutes);

const supervisorRoutes = require("./routes/supervisorRoutes");
app.use(supervisorRoutes);

const cosupervisorRoutes = require("./routes/cosupervisorRoutes");
app.use(cosupervisorRoutes);

const eventRoute = require("./routes/submissionTypeRoutes")
app.use("/api/events", eventRoute)

const myRejectedSupervisorsRoutes =require("./routes/myRejectedSupervisorsRoutes")
app.use(myRejectedSupervisorsRoutes);

const myRejectedCoSupervisorsRoutes =require("./routes/myRejectedCoSupervisorsRoutes")
app.use(myRejectedCoSupervisorsRoutes);

const topicsRouter = require("./routes/topicsRoutes");
app.use(topicsRouter);

const markingSchemaRouter = require("./routes/markingSchemaRoutes");
app.use(markingSchemaRouter);

const evaluationsRouter = require("./routes/evaluationsRoutes");
app.use(evaluationsRouter);

const messageRoutes = require("./routes/messages");
app.use("/api/messages", messageRoutes);



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
      const server = app.listen(PORT, () =>
        success({ message: `Server started on PORT ${PORT}`, badge: true })
      );

      const io = socket(server, {
        cors: {
          origin: "http://localhost:3000",
          credentials: true,
        },
      });

      global.onlineUsers = new Map();
      io.on("connection", (socket) => {
        global.chatSocket = socket;
        socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
        });

        socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to);
          if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
          }
        });
      });

    } catch (err) {
      error({
        message: `Unable to connect with Database \n${err}`,
        badge: true
      });
      startApp();
    }
  };
  
  startApp();