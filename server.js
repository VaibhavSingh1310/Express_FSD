require('dotenv').config();//it is used to load environment variables from a .env file into process.env
const express = require('express');
const app = express();//it is a method of express to create an express application
const PORT = process.env.PORT||8000;//it is used to set the port number for the server to listen on, if the PORT environment variable is not set, it will default to 3000


mongoose = require('mongoose');//it is a library that provides a straight-forward, schema-based solution to model your application data 
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((err)=>{
        console.log("Could not connect to database",err)
    })
app.use(express.json());//we use this middleware to parse the incoming request body in json format


// const studentRoutes = require('./routes/studentRoutes');
// //Global middleware
// app.use((req,res,next)=>{
//     console.log("Requested ur",req.originalUrl);
//     console.log("Request Type:",req.method);
//     console.log("Date:",Date.now());
//     next();
// })

// app.use('/students',studentRoutes);
// const teacherRoutes = require('./routes/teacherRoutes');
// app.use('/teachers',teacherRoutes);

const areaRoute = require('./area');
app.use('/area',areaRoute);
// ================= SERVER =================
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})











