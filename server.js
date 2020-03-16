/*
    * server.js
    * MAIN ENTRYPOINT FOR SERVER & API
    * TO RUN ME: # node server.js OR # pm2 start server.js
*/

// IMPORTS
const express = require('express');                 // FOR BUILDING API
const mysql = require('mysql');                     // FOR INTERACTING WITH MYSQL
const cookieParser = require('cookie-parser');      // FOR PARSING COOKIES
const bodyParser = require('body-parser');          // FOR PARSING POST REQUESTS
const passport = require('passport');               // FOR AUTH WITH JWT
const http = require('http');                       // FOR HOSTING SERVER
const bcrypt = require('bcryptjs');                 // FOR HASHING PASSWORDS
const cors = require('cors');                       // CORS
const ip = require('ip');                           // FOR GETTING IP ADDRESS
const jwt = require('jsonwebtoken');                // FOR AUTHENTICATION
const _ = require('lodash');                        // FOR WORKING WITH OBJECTS


const apiRoutes = require('./api/api.controller');  // FOR API ROUTES


// INITIALIZE APP
const app = express();
app.use(express.json());


// ADD MIDDLEWARE LAYERS FOR PARSING REQUESTS, ALL REQUESTS PASS THROUGH THIS BEFORE HITTING ENDPOINTS
app.use(bodyParser.json());                         // MIDDLEWARE TO HANDLE PARSING REQUEST BODY (POST REQUESTS)
app.use(bodyParser.urlencoded({extended: false}));  // MIDDLEWARE TO HANDLE URLENCODED REQUEST BODIES
app.use(cors());

// USE THE API (REFER TO SPECIFIED FILE FOR CONTROLLER)
app.use('/api', apiRoutes);


// CREATE THE HTTP SERVER
http.createServer(app)  // USE THE EXPRESS APP
    .listen(8080, () => {
        console.log(`API is listening on ${ip.address()}:8080`);
    })

