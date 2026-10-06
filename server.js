require('dotenv').config();//it is used to load environment variables from a .env file into process.env
const express = require('express');
const app = express();//it is a method of express to create an express application
const PORT = process.env.PORT||8000;//it is used to set the port number for the server to listen on, if the PORT environment variable is not set, it will default to 3000
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());//we use this middleware to parse the incoming request body in json format

//Global middleware
app.use((req,res,next)=>{
    console.log("Requested ur",req.originalUrl);
    console.log("Request Type:",req.method);
    console.log("Date:",Date.now());
    next();
})
app.use('/students',studentRoutes);
app.use('/teachers',teacherRoutes);
app.use('/auth',authRoutes);


const areaRoute = require('./area');
app.use('/area',areaRoute);
// ================= SERVER =================
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})











