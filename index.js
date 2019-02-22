// play this: https://www.youtube.com/watch?v=d-diB65scQU

//import modules!

const express = require('express');
const helmet= require('helmet');
const morgan =require('morgan');
const cors =require('cors');

//import routes
const project =require('./routes/project');
const action = require('./routes/action');

//create the server by assigning express to a variable

const server = express();

//create a dynamic port 

const PORT = process.env.PORT || 5000;

//hook up the server to middleware stuffs

server.use(express.json());
server.use(helmet());
server.use(morgan());
server.use(cors());
server.use('/api/projects', project)
server.use('/api/action', action)

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });