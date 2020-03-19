/*
    * server.js
    * MAIN ENTRYPOINT FOR SERVER & API
    * TO RUN ME: # node server.js OR # pm2 start server.js
*/

// IMPORTS
const express = require('express');                 // FOR BUILDING API
const cookieParser = require('cookie-parser');      // FOR PARSING COOKIES
const bodyParser = require('body-parser');          // FOR PARSING POST REQUESTS
const http = require('http');                       // FOR HOSTING SERVER
const cors = require('cors');                       // CORS
const ip = require('ip');                           // FOR GETTING IP ADDRESS
const bearerToken = require('express-bearer-token') // FOR PULLING BEARER TOKENS OUT OF REQUESTS

// AUTH GUARD
const authGuard = require('./api/helpers/authguard.helper');
// CONTROLLERS FOR PUBLIC AND PRIVATE ROUTES
const publicRoutes = require('./api/controllers/api.controller.public');    // FOR PUBLIC API ROUTES
const privateRoutes = require('./api/controllers/api.controller.private');  // FOR PRIVATE API ROUTES

// INITIALIZE APP
const app = express();
app.use(express.json());


// ADD MIDDLEWARE LAYERS FOR PARSING REQUESTS, ALL REQUESTS PASS THROUGH THIS BEFORE HITTING ENDPOINTS
app.use(bodyParser.json());                         // MIDDLEWARE TO HANDLE PARSING REQUEST BODY (POST REQUESTS)
app.use(bodyParser.urlencoded({extended: false}));  // MIDDLEWARE TO HANDLE URLENCODED REQUEST BODIES
app.use(cors());                                    // MIDDLEWARE TO HANDLE CROSS-ORIGIN REQUESTS
app.use(bearerToken());                             // MIDDLEWARE TO HANDLE BEARER TOKENS FOR PRIVATE ROUTES

// USE THE API (REFER TO SPECIFIED FILE FOR CONTROLLER)
app.use('/api/public', publicRoutes);

// USE PRIVATE ROUTES, BEHIND EXPRESS JWT MIDDLEWARE
app.use(authGuard);
app.use('/api/private', privateRoutes);

// CREATE THE HTTP SERVER
http.createServer(app)  // USE THE EXPRESS APP
    .listen(8080, () => {
        console.log(`API is listening on ${ip.address()}:8080`);
    })

