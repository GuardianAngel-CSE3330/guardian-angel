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
router.post('/sightings/create', createSighting);
router.get('/sightings/:month/:year', getSightingsByMonth);
router.get('/sightings/all', getAllSightings);

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

function createSighting(request, response, next) {
    let sighting = {
        reporterid : request.body.reporterid,
        reportername : request.body.reportername,
        reporteremail : request.body.reporteremail,
        ghostid : request.body.ghostid,
        ghostname : request.body.ghostname,
        month: request.body.month,
        year: request.body.year,
        day: request.body.day,
        location: request.body.location,
        title: request.body.title,
        description: request.body.description,
        imageurl: request.body.imageurl
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

function getAllSightings(request, response, next) {
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
module.exports = router;