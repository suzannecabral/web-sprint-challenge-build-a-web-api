//imports
const express = require('express');
const Projects = require('./data/helpers/projectModel');

//define new router
const router = express.Router();

//----------------------------------
//[x]
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
//[x]
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

//[x]
//post new
//contains name, description
router.post('/', validProjectInput, (req,res)=>{
    const {name, description} = req.body;
    const newProject = {name, description}

    Projects.insert(newProject)
        .then(()=>{
            console.log("PROJECT POST SUCCESS");
            res.status(201).json({message:`New project created successfully`});
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error creating project`});
        })
});

//[x]
//update :id
//has name, description
router.put('/:id', validProjectId, validProjectInput, (req,res)=>{
    const {id}=req.params;
    const {name, description} = req.body;
    const updatedProject = {id, name, description}

    Projects.update(id, updatedProject)
        .then(()=>{
            res.status(200).json({message:`Updated project successfully`});
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error updating project`});
        })

});

//[x]
//delete :id
router.delete('/:id', validProjectId, (req,res)=>{
    const {id} = req.params;
    Projects.remove(id)
        .then(()=>{
            console.log("PROJECT DELETE SUCCESS");
            res.status(200).json({message:`Project deleted successfully`});
            })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error deleting project`});
        })
});

// //----------------------------------
//export
module.exports = router; 