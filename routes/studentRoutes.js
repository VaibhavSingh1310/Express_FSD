const express = require('express');
const router = express.Router();
const checkroles = require('../middleware/roleMiddleware');
const studentModel = require('../models/studentModel');
const authMiddleware = require('../middleware/authMiddleware');

let students = [
    {
        id: 1,
        name: "Ram",
        age: 21,
        course: "BCA"
    },
    {
        id: 2,
        name: "Rohit",
        age: 20,
        course: "Btech"
    }
];
router.use(express.json());//we use this middleware to parse the incoming request body in json format
//to read the data we call app.get() method
//requesting all resources from the server
router.get('/',authMiddleware,checkroles('teacher','student','admin'),(req,res)=>{
    students = studentModel.find();
    res.json(students)//sending response in json format
})
//reading data on the basis of filter 
router.get('/search',authMiddleware,checkroles('teacher','student','admin'),(req, res) => {
    const course = req.query.course;
    const age = parseInt(req.query.age);
    const student = students.filter(s =>s.course.toLowerCase() === course.toLowerCase() && s.age === parseInt(age));
    res.json(student);
});

router.get('/:id',authMiddleware,checkroles('teacher','student','admin'),(req,res)=>{   
    const id = parseInt(req.params.id); //params is used to get the value of the parameter in the url
    const student = students.find(student=>(student.id === id));
    if(!student){
        return res.status(404).json({
            message: "Student not found"
        });
    }
    res.json(student);
});

//post method is used to create a new resource on the server
router.post("/",authMiddleware,checkroles('teacher','admin'),(req,res)=>{
    const newStudent={
        id:students.length+1,
        name:req.body.name,
        age:req.body.age,
        course:req.body.course
    }
    students.push(newStudent)
    res.status(201).json({
        message:"student created",
        student:newStudent
    })

})


router.delete("/:id",authMiddleware,checkroles('admin'),(req,res)=>{
    const id = parseInt(req.params.id);
    const student = students.find(student=>student.id === id)
    if(!student){  
        return res.status(404).json({message: "Student not found"});
    }
    students = students.filter(student=>student.id !== id)
    res.json({message: "Student deleted"});
})

//----------------Put metod is used to update a resource on the server change the all the fields of the resource
router.put("/:id",authMiddleware,checkroles('admin'),(req,res)=>{
    const id = parseInt(req.params.id);
    const student = students.find(student=>student.id === id);
    if(!student){
        return res.status(404).json({message: "student not found"});
    }
    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;
    res.json({
        message:"student updated",
        student:student
    })
}
)

//----------------Patch method is used to update a resource on the server change the some fields of the resource
router.patch("/:id",authMiddleware,checkroles('admin'),(req,res)=>{
    const id = parseInt(req.params.id);
    const student = students.find(student=>student.id === id);
    if(!student){
        return res.status(404).json({
            message: "student not found"
        })
    }
    if(req.body.name !== undefined){
        student.name = req.body.name;
    }
    if(req.body.age !== undefined){
        student.age = req.body.age;
    }
    if(req.body.course !== undefined){
        student.course = req.body.course;
    }
    res.json(student);
})
module.exports = router;