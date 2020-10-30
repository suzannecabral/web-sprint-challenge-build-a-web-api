//imports
const express = require('express');
const Actions = require('./data/helpers/actionModel');

//define new router
const router = express.Router();

//endpoints
router.get('/', (req, res) => {
    res.status(200).json({message:`Actions router is working`});
});

//middleware


//export
module.exports = router;