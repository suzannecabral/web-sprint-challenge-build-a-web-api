//imports
const express = require('express');
const Projects = require('./data/helpers/projectModel');

//define new router
const router = express.Router();

//[ ]
//endpoints
//----------------------------------

//[x]
//get all
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
//[ ]
//get :id


//[ ]
//post new


//[ ]
//update :id


//[ ]
//delete :id

//----------------------------------

//[ ]
//middleware


//export
module.exports = router;