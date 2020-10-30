//imports
const express = require('express');
const Projects = require('./data/helpers/projectModel');

//define new router
const router = express.Router();

//endpoints
router.get('/', (req,res)=>{
    Projects.get()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`server error retrieving projects data`});
        })
});

//middleware


//export
module.exports = router;