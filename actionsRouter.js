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

//[ ]
//post new **** must be associated with project
//has description, notes

//-----> this is located in projects router
//      must be associated with a project

// router.post('/', validActionInput, (req,res)=>{
//     const project_id = req.params.id;
//     const {notes, description} = req.body;
//     const newAction = {notes, description}

//     Actions.insert(newAction)
//         .then(()=>{
//             console.log("ACTION POST SUCCESS");
//             res.status(201).json({message:`New action created successfully`});
//         })
//         .catch(err=>{
//             console.log(err);
//             res.status(500).json({message:`Server error creating action`});
//         })
// });


//[ ]
//update :id
//has description, notes

//------> This is on project router
//------> Needs project ID

router.put('/:id', /*validActionId, validActionInput,*/ (req,res)=>{
    const {id} = req.params;
    // const {description, notes, project_id} = req.body;
    // const updatedAction = {project_id, description, notes}

    Actions.update(id, req.body)
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
        })

    // console.log("UPDATE SUCCCESS");
    // console.log(updatedAction);
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