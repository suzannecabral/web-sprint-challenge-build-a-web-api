const express = require('express');
const projectsRouter = require('./projectsRouter');
const actionsRouter = require('./actionsRouter');

//server is deployed at:
//https://sc-node-week1-sprint.herokuapp.com/

//new server
const server = express(); 

//define server middleware
const logger = (req,res,next) => {
    const ts = new Date();

    console.log(`-------------------`);
    console.log(`[${ts.toLocaleTimeString()}] Server Request: `);
    console.log(`${req.method} ${req.url}`);
    console.log(`-------------------`);
    next();
}

//use middleware
server.use(express.json());
server.use(logger);

//use routers
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


//default response
server.get('/', (req,res)=>{
    res.status(200).json({message:`Server is running, better go catch it`})
});

server.get('/api', (req,res)=>{
    res.status(200).json({message:`Welcome to the api, please use an endpoint`});
});


//export server
module.exports = server;