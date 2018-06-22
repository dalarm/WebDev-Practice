const express = require('express');
const router = express.Router()

const genres = [
    {id : 1, name: 'Romance'},
    {id: 2, name: 'Thriller'},
    {id: 3, name: 'Mystery'},
    {id: 4, name: 'Action'},
    {id: 5, name: 'Comedy'}
];

//Get (all genres)

router.get('/', (req, res) =>{
    res.send(genres); 
});

//Get specific genre

router.get('/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the ID does not exist');
    res.send(genre);
});

//Put

router.get('/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the ID does not exist');

    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre); 
})

//Post

router.post('/', (req,res) =>{
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
})

//Delete

router.delete('/:id', (req,res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the ID does not exist');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema); 
}

module.exports = router;
