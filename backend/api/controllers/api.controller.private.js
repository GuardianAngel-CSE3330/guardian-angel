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
router.get('/users/:id', getOneUser)
router.put('/sightings/create', createSighting);
router.get('/sightings/:month/:year', getSightingsByMonth);
router.get('/sightings/all', getAllSightings);
router.delete('/sightings/:id', deleteSightingByID);
router.patch('/sightings/:id', updateSighting);

////////////////////////////////////////////////////
// DEFINE FUNCTIONS FOR ROUTES
////////////////////////////////////////////////////
function getAllUsers(request, response, next) {
    console.log(`Received request to get all users`);
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

function getOneUser(request, response, next) {
    console.log('received request to get one user');
    const id = request.params.id;
    dbService.getUserById(id)
        .then( (result) => {
            if (result) {
                response.send(JSON.stringify(result));
            }
            else {
                response.status(404).json({
                    message: `Could not find a user with the specified ID`
                })
            }
        })
        .catch( (err) => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

function createSighting(request, response, next) {
    console.log(`Received request to create a sighting`);
    let sighting = {
        reporterid : request.body.reporterid,
        ghostid : request.body.ghostid,
        month: request.body.month,
        year: request.body.year,
        day: request.body.day,
        location: request.body.location,
        title: request.body.title,
        description: request.body.description,
        imageurl: request.body.imageurl,
        spookiness: request.body.spookiness
    };

    dbService.createSighting(sighting)
        .then( (results) => {
            response.status(201).json({
                message: "OK"
            })
        })
        .catch( (err) => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// MONTH: STRING FROM 0-11 REPRESENTING MONTH
// YEAR: 4-DIGIT YEAR
function getSightingsByMonth(request, response, next) {
    console.log(`received request to get sighting by month`);
    let month = request.params.month;
    let year = request.params.year;

    dbService.getSightingsByDate(month, year)
        .then(results => {
            response.send(JSON.stringify(results));
        })
        .catch( err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
    }

// GET ALL SIGHTINGS
// NO PARAMETERS
function getAllSightings(request, response, next) {

    console.log(`received request to get all sightings`);
    dbService.getAllSightings()
        .then( (results) => {
            response.send(JSON.stringify(results));
        })
        .catch ( (err) => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// DELETE A SIGHTING, ONE ROUTE PARAMETER: A SIGHTING ID
function deleteSightingByID(request, response, next) {

    let id = request.params.id;
    let idNumber = parseInt(id);
    console.log(`received request to delete a sighting with id ${idNumber}`);
    dbService.deleteSightingByID(id)
        .then( (results) => {
            response.status(200).json({
                message: `OK`
            })
        })
        .catch( (err) => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// UPDATE A SIGHTING, ROUTE PARAM OF SIGHTING ID, BODY  VALUE SHOULD BE AN OBJECT DIFF
function updateSighting(request, response, next) {
    let ID  = parseInt(request.params.id);
    let diff = request.body;
    
    console.log(`Received request to update a sighting with id ${ID}, diff of ${JSON.stringify(diff)}`);
    dbService.updateSighting(diff, ID)
        .then(results => {
            response.status(200).json({
                message: 'OK'
            })
        })
        .catch( err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
    
}
module.exports = router;