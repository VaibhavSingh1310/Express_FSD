const express = require('express');

const router = express.Router();

let teachers = [
    {
        id: 1,
        name: "Sharma",
        age: 40,
        subject: "Maths",
        experience: 15
    },
    {
        id: 2,
        name: "Verma",
        age: 35,
        subject: "Physics",
        experience: 10
    }
];


// ================= GET ALL TEACHERS =================

router.get('/', (req, res) => {
    res.json(teachers);
});


// ================= SEARCH TEACHERS =================

// Example:
// GET /teachers/search?subject=Maths&age=40

router.get('/search', (req, res) => {

    const subject = req.query.subject;
    const age = req.query.age;

    const teacher = teachers.filter(
        t =>
            t.subject.toLowerCase() === subject.toLowerCase() &&
            t.age === parseInt(age)
    );

    res.json(teacher);
});


// ================= GET TEACHER BY ID =================

router.get('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const teacher = teachers.find(
        teacher => teacher.id === id
    );

    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    res.json(teacher);
});


// ================= POST TEACHER =================

router.post('/', (req, res) => {

    const newTeacher = {
        id: teachers.length + 1,
        name: req.body.name,
        age: req.body.age,
        subject: req.body.subject,
        experience: req.body.experience
    };

    teachers.push(newTeacher);

    res.status(201).json({
        message: "Teacher created",
        teacher: newTeacher
    });
});


// ================= DELETE TEACHER =================

router.delete('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const teacher = teachers.find(
        teacher => teacher.id === id
    );

    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    teachers = teachers.filter(
        teacher => teacher.id !== id
    );

    res.json({
        message: "Teacher deleted"
    });
});


// ================= PUT TEACHER =================

router.put('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const teacher = teachers.find(
        teacher => teacher.id === id
    );

    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    teacher.name = req.body.name;
    teacher.age = req.body.age;
    teacher.subject = req.body.subject;
    teacher.experience = req.body.experience;

    res.json({
        message: "Teacher updated",
        teacher: teacher
    });
});


// ================= PATCH TEACHER =================

router.patch('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const teacher = teachers.find(
        teacher => teacher.id === id
    );

    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    if (req.body.name !== undefined) {
        teacher.name = req.body.name;
    }

    if (req.body.age !== undefined) {
        teacher.age = req.body.age;
    }

    if (req.body.subject !== undefined) {
        teacher.subject = req.body.subject;
    }

    if (req.body.experience !== undefined) {
        teacher.experience = req.body.experience;
    }

    res.json({
        message: "Teacher updated",
        teacher: teacher
    });
});


// ================= EXPORT =================

module.exports = router;