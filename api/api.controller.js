const express = require('express');                 // WE NEED EXPRESS HERE TOO
const router = express.Router();                    // CREATE A ROUTER
const jwt = require('jsonwebtoken');                // FOR AUTHENTICATION
const _ = require('lodash');                        // FOR OBJECT MANIPULATION
const JWT_KEY = require('../config/key').token;     // FOR SIGNING JWT TOKENS
const bcrypt = require('bcryptjs');                 // FOR SALTING AND HASHING

// SERVICES
const dbService = require('./db.service');  // PROVIDE ACCESS TO DB

// DEFINE ROUTES WITH FUNCTION CALLBACKS
router.get('/', helloworld);
router.get('/db-test', DBTest);
router.post('/users/create', createUser)

///////////////////////////////////////////////////
// SHIT FOR JWT AUTHENTICATION
///////////////////////////////////////////////////
function createToken(user) {
    return jwt.sign(_.omit(user, ['hash', 'salt']), JWT_KEY, {expiresIn: 60 * 60 * 5});
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
        response.write(JSON.stringify(resultString));
        response.end();
    })
    .catch (err => {
        console.log(`An error ocurred: ${err}`);
    })
}

// BODY NEEDS: email, firstname, lastname, password, 
function createUser(request, response, next) {
    console.log("received request to create a user");

    // ENSURE THE REQUEST IS PROPERLY FORMED
    if (!request.body.email || !request.body.password) {
        response.status(400).json({
            message: "Email or Password was not specified"
        })
    }
    if (!request.body.firstname) {
        response.status(400).json({
            message: "Must specify user first name!"
        })
    }
    if (!request.body.lastname) {
        response.status(400).json({
            message: "Must specify user last name!"
        })
    }

    // CHECK TO SEE IF THE USER EXISTS
    dbService.getUser(request.body.email)
        .then(user => {

            // IF THE USER ALREADY EXISTS
            if (user) {
                response.status(400).json({
                    message: `A user with that email already exists!`
                })
            }

            // IF A USER WITH THAT EMAIL DOES NOT ALREADY EXIST, CREATE A NEW ONE!
            else {
                
                // GENERATE A SALT
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        throw err;
                    }

                    bcrypt.hash(request.body.password, salt, (error, hash) => {
                        if (error) {
                            throw error;
                        }

                        // NOW WE HAVE A HASH, SO ASSEMBLE A USER OBJECT
                        let newUser = {
                            'email': request.body.email,
                            'hash': hash,
                            'role': request.body.role || 'user',
                            'salt': salt,
                            'firstname': request.body.firstname,
                            'lastname': request.body.lastname
                        }

                        // USE THE DB SERVER TO CREATE A USER
                        dbService.createUser(newUser)
                            .then(result => {

                                // SEND THE RESPONSE
                                response.status(201).send({
                                    id_token: createToken(newUser)
                                })
                            })
                            .catch(err => {
                                response.status(500).json({
                                    message: `An error ocurred: ${err}`
                                })
                            })

                    })
                });
                    
            }
        })
        .catch (err => {
            console.log(`An error ocurred: ${err}`);
            response.status(500).json({
                message: `An Error ocurred: ${err}`
            })
        })
}


// THIS LINE MUST GO AT THE BOTTOM
module.exports = router;