//imports
const express = require('express');
const Actions = require('./data/helpers/actionModel');

//define new router
const router = express.Router();


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