const express = require('express');
const app = express();
const PORT = 8000;

//application level middleware
//1)Not Mount on path
// app.use((req,res,next)=>{
//     console.log("Middleware 1");
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("Middleware 2");
//     next();
// })


// //2)Mount on path
// app.use('/student/:id',(req,res,next)=>{
//     console.log("Response Type",req.method);
// })

// //route level middleware
// app.get('/student',(req,res)=>{
//     console.log("Router level Middleware");
//     res.send("Home Page");
// }
// )

// //Multiple routes handling
// app.use('/user/:id',(req,res,next)=>{
//     console.log("Requested url:",req.url);
//     next();
// },
// (req,res,next)=>{
//     console.log("Request Type",req.method);
// }
// )

app.get('/student/:id',(req,res,next)=>{
    if(req.params.id === '0'){
        next('route');

    }
    else{
        next();
    }
})

app.get('/student/:id',(req,res)=>{
    res.send("Special Route here")
}
)

//--------------Error Handling-------------------------------------------------------------------------------
app.use((err,req,res,next)=>{
    console.log(err.stack());
    res.status(201).send();
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})