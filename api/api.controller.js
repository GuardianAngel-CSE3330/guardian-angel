const express = require('express');                 // WE NEED EXPRESS HERE TOO
const router = express.Router();                    // CREATE A ROUTER
const jwt = require('jsonwebtoken');                // FOR AUTHENTICATION
const _ = require('lodash');                        // FOR OBJECT MANIPULATION

// SERVICES
const dbService = require('./db.service');              // PROVIDE ACCESS TO DB
const jwtService = require('./jwt.service')             // PROVIDE SECURITY FUNCTIONALITY
const passwordService = require('./password.service');  // PROVIDE PASSWORD HASHING FUNCTIONALITY

// DEFINE ROUTES WITH FUNCTION CALLBACKS
router.get('/', helloworld);
router.get('/db-test', DBTest);
router.post('/user/create', createUser);
router.post('/user/login', loginUser);


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

// BODY NEEDS: email, firstname, lastname, password, (role)
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
                
                // GENERATE A SALT FOR SALTING THE PASSWORD HASH
                passwordService.generateSalt()
                    .then( (salt) => {

                        // GENREATE A HASH FOR THE SALTED PASSWORD
                        passwordService.generateHash(request.body.password, salt)
                            .then( (hash) => {
                                
                                // CREATE A NEW USER OBJECT WITH THE HASH AND SALT
                                let newUser = {
                                    'email': request.body.email,
                                    'hash': hash,
                                    'role': request.body.role || 'user',
                                    'firstname': request.body.firstname,
                                    'lastname': request.body.lastname
                                }
        
                                // USE THE DB SERVER TO CREATE A USER
                                dbService.createUser(newUser)
                                    .then(result => {
        
                                        // SEND THE RESPONSE
                                        response.status(201).send({
                                            id_token: jwtService.createToken(newUser)
                                        })
                                    })
                                    .catch(err => {
                                        response.status(500).json({
                                            message: `An error ocurred: ${err}`
                                        })
                                    })
                            })
                            .catch ( (err) => {
                                response.status(500).json({
                                    message: `An error ocurred: ${err}`
                                })
                            })
                    })
                    .catch( (err) => {
                        response.status(500).json({
                            message: `An error ocurred: ${err}`
                        })
                    })
            }
        })
        .catch (err => {
            console.log(`An error ocurred: ${err}`);
            response.status(500).json({
                message: `An Error ocurred: ${err}`
            })
        })
}

// BODY NEEDS: email, password
function loginUser(request, response, next) {
    console.log("received a request to login a user");

    // ENSURE THE REQUEST IS PROPERLY FORMED
    if (!request.body.email || !request.body.password) {
        response.status(400).json({
            "message": "Email or password was not specified!"
        });
    }
    else {
        
        // LOOK UP THE USER WITH THE SPECIFIED USER
        dbService.getUser(request.body.email)
            .then( (user) => {
                // IF THE USER IS FOUND
                if (user) {
                    
                    // COMPARE THE PASSWORD TO THE HASH
                    passwordService.comparePassword(request.body.password, user.hash)
                        .then( (passwordsMatch) => {
                            
                            // IF THE PASSWORD MATCHES THE HASH, CREATE AND SEND A TOKEN
                            if (passwordsMatch) {
                                response.status(200).send({
                                    id_token: jwtService.createToken(user)
                                })
                            }
                            else {
                                response.status(401).json({
                                    message: "The username/password combination doesn't match any users"
                                })
                            }
                        })
                        .catch( (err) => {
                            response.status(500).json({
                                message: `An error ocurred: ${err}`
                            })
                        })
                }
                else { 
                    response.status(401).json({
                        message: `An account matching that email could not be found`
                    })
                }
            })
            .catch( (err) => {
                response.status(500).json({
                    message: `An error ocurred: ${err}`
                })
            })
    }


}


// THIS LINE MUST GO AT THE BOTTOM
module.exports = router;