//imports
const express = require('express');
const Projects = require('./data/helpers/projectModel');
const Actions = require('./data/helpers/actionModel');

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


//[x]
//validate action input
//needs: description, notes
const validActionInput = (req, res, next) => {
    console.log("ACTION INPUT VALIDATED");
    next();
    //there is a body to the message
    if(Object.keys(req.body).length>0){
        //body contains both name and description
        if(req.body.description && req.body.notes){
            // res.status(200).json({message:`Input validated`});
            //passes the check, continue
            next();
        }else{
            res.status(400).json({message:`Action description and notes are required`});
        }
    }else{
        res.status(400).json({message:`Please provide action information`});
    }
}



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

//[ ]
//update :id


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


//[ ]
//post new ACTION for project
// **** must be associated with project
//has description, notes
router.post('/:id', validActionInput, (req,res)=>{
    const project_id = req.params.id;
    
    const {notes, description} = req.body;
    const newAction = {project_id, notes, description};

    Actions.insert(newAction)
        .then(()=>{
            console.log("ACTION POST SUCCESS");
            res.status(201).json({message:`New action created successfully`});
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error creating action`});
        })
});

//----------------------------------
//export
module.exports = router;