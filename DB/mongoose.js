mongoose = require('mongoose');//it is a library that provides a straight-forward, schema-based solution to model your application data 
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((err)=>{
        console.log("Could not connect to database",err)
    })