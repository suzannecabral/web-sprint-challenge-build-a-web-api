//imports
const express = require('express');
const Actions = require('./data/helpers/actionModel');

//define new router
const router = express.Router();

//----------------------------------
//[x]
//middleware
//----------------------------------

//[x]
//validate Id
const validActionId = (req, res, next) => {
    const {id} = req.params;

    Actions.get(id)
        .then(data=>{
            if(data){
                //passes the check
                req.action = data;
                next();
            }else{
                res.status(404).json({message:`No action found with id: ${id}`});
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error validating action ID`});
        })
};

//[x]
//validate input
//needs: description, notes
const validActionInput = (req, res, next) => {
    //there is a body to the message
    if(Object.keys(req.body).length>0){
        //body contains both name and description
        if(req.body.description && req.body.notes && req.body.project_id){
            // res.status(200).json({message:`Input validated`});
            //passes the check, continue
            next();
        }else{
            res.status(400).json({message:`Action description, notes and project_id are required`});
        }
    }else{
        res.status(400).json({message:`Please provide action information`});
    }
}

//----------------------------------
//[x]
//endpoints
//----------------------------------

//[x]
//get all
router.get('/', (req, res) => {
    Actions.get()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:`server error retrieving actions data`});
    })
});

//[x]
//get :id
router.get('/:id', validActionId, (req,res)=>{
    res.status(200).json(req.action);
});

//[x]
//post action
//has description, notes, project_id

//--> needs validator for post id
router.post('/', validActionInput, (req,res)=>{
    Actions.insert(req.body)
        .then((data)=>{
            console.log("ACTION POST SUCCESS");
            res.status(201).json(data);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error creating action`});
        })
});

//[x]
//update :id
//has description, notes

//------> This is on project router
//------> Needs project ID

router.put('/:id', validActionId, validActionInput, (req,res)=>{
    const {id} = req.params;

    Actions.update(id, req.body)
        .then(data=>{
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`server error while updating action`});
        })

});


//[x]
//delete :id
router.delete('/:id', validActionId, (req,res)=>{
    const {id} = req.params;
    Actions.remove(id)
        .then(()=>{
            console.log("ACTION DELETE SUCCESS");
            res.status(200).json({message:`Action deleted successfully`});
            })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:`Server error deleting action`});
        })
});


//----------------------------------
//export
module.exports = router;