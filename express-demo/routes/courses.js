const express = require('express');
const router = express.Router()

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name : 'course 3'}
];

router.get('/', (req,res) =>{
    res.send(courses);
});

router.post('/', (req,res) =>{

    const { error } = validateCourse(req.body);
    if  (error) {
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.get('/:id', (req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('the course was not foud');
    res.send(course);
});

//GET
router.put('/:id', (req,res)=>{
    //Look up course
    // If doesn't exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('the course was not foud');

    //Validate.
    //If invalid, return 400

    const { error } = validateCourse(req.body);
    if  (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course

    course.name = req.body.name;

    // Return updated course.

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

//Delete

router.delete('/:id', (req,res)=>{
    //Look up course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('the course was not foud');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

    //Return the same course
})

module.exports = router;