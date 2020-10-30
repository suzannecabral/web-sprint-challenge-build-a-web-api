//imports
const express = require('express');
const Projects = require('./data/helpers/projectModel');

//define new router
const router = express.Router();

//----------------------------------
//[ ]
//middleware
//----------------------------------

//[x]
//validate Id
const validProjectId = (req, res, next) => {
    const {id} = req.params;

    Projects.get(id)
        .then(data=>{
            if(data){
                //passes the check
                req.project = data;
                next();
            }else{
                res.status(404).json({message:`No project found with id: ${id}`});
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error validating project ID`});
        })
};

//[x]
//validate input
//needs: name, description
const validProjectInput = (req, res, next) => {
    //there is a body to the message
    if(Object.keys(req.body).length>0){
        //body contains both name and description
        if(req.body.name && req.body.description){
            // res.status(200).json({message:`Input validated`});
            //passes the check, continue
            next();
        }else{
            res.status(400).json({message:`Both name and description are required`});
        }
    }else{
        res.status(400).json({message:`Please provide project information`});
    }


    

    
};

//----------------------------------
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

//[x]
//get :id
router.get('/:id', validProjectId, (req,res)=>{
    res.status(200).json(req.project);
});

//[ ]
//post new
router.post('/', validProjectInput, (req,res)=>{
    console.log('SUCCESS');
    // res.status(201).json(req.body);
});

//[ ]
//update :id


//[ ]
//delete :id


//----------------------------------
//export
module.exports = router;