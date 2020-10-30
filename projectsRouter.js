//imports
const express = require('express');
const Projects = require('./data/helpers/projectModel');

//define new router
const router = express.Router();

//----------------------------------
//[ ]
//middleware
//----------------------------------

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
//[ ]
//get :id
router.get('/:id', validProjectId, (req,res)=>{
    res.status(200).json(req.project);
});

//[ ]
//post new


//[ ]
//update :id


//[ ]
//delete :id


//----------------------------------
//export
module.exports = router;