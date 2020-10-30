//imports
const express = require('express');
const Actions = require('./data/helpers/actionModel');

//define new router
const router = express.Router();

//----------------------------------
//[ ]
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

//[ ]
//validate input



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

//[ ]
//get :id
router.get('/:id', validActionId, (req,res)=>{
    res.status(200).json(req.action);
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