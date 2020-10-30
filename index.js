require ('dotenv').config();
// const express = require('express');
const server = require('./server.js');

//server is deployed at:
//https://sc-node-week1-sprint.herokuapp.com/


const PORT = process.env.PORT || 9000;

server.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`);
});

