////////////////////////////////////////////
// THIS CONTROLLER IS FOR PRIVATE API ROUTES
////////////////////////////////////////////

const express = require('express');                 // WE NEED EXPRESS HERE TOO
const router = express.Router();                    // CREATE A ROUTER
const jwt = require('jsonwebtoken');                // FOR AUTHENTICATION
const _ = require('lodash');                        // FOR OBJECT MANIPULATION

// SERVICES
const dbService = require('../services/db.service');              // PROVIDE ACCESS TO DB
const jwtService = require('../services/jwt.service')             // PROVIDE SECURITY FUNCTIONALITY
const passwordService = require('../services/password.service');  // PROVIDE PASSWORD HASHING FUNCTIONALITY

// DEFINE ROUTES
router.get('/users/all', getAllUsers);

////////////////////////////////////////////////////
// DEFINE FUNCTIONS FOR ROUTES
////////////////////////////////////////////////////
function getAllUsers(request, response, next) {
    dbService.getAllUsers()
        .then( (results) => {
            response.send(JSON.stringify(results));
        })
        .catch( (err) => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

module.exports = router;