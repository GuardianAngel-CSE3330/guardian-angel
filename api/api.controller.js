const express = require('express');                 // WE NEED EXPRESS HERE TOO
const router = express.Router();                    // CREATE A ROUTER
const jwt = require('jsonwebtoken');                // FOR AUTHENTICATION
const _ = require('lodash');                        // FOR OBJECT MANIPULATION

// SERVICES
const dbService = require('./db.service');  // PROVIDE ACCESS TO DB

// DEFINE ROUTES WITH FUNCTION CALLBACKS
router.get('/', helloworld);
router.get('/db-test', DBTest);

///////////////////////////////////////////////////
// SHIT FOR JWT AUTHENTICATION
///////////////////////////////////////////////////
function createToken(user) {

}

////////////////////////////////////////////////////
// DEFINE FUNCTIONS FOR ROUTES
////////////////////////////////////////////////////
function helloworld(request, response, next) {
    console.log('request made it to the default edpoint!');
    response.write("Hello, world");
    response.end();
}

function DBTest(request, response, next) {
    console.log("request made it to the test db endpoint!");
    dbService.query('Select * from users')
    .then(resultString => {
        // RESULTS RETURNED AS STRINGIFIED JSON
        response.write(resultString);
        response.end();
    })
    .catch (err => {
        console.log(`An error ocurred: ${err}`);
    })
}


// THIS LINE MUST GO AT THE BOTTOM
module.exports = router;