////////////////////////////////////////////
// THIS CONTROLLER IS FOR PRIVATE API ROUTES
////////////////////////////////////////////

const express = require('express');                 // WE NEED EXPRESS HERE TOO
const router = express.Router();                    // CREATE A ROUTER

// SERVICES
const dbService = require('../services/db.service');              // PROVIDE ACCESS TO DB

// DEFINE ROUTES
router.get('/users/all', getAllUsers);
router.get('/users/:id', getOneUser);
router.patch('/users/:id', updateUser)

router.put('/sightings/create', createSighting);
router.get('/sightings/date/:month/:year', getSightingsByMonth);
router.get('/sightings/all', getAllSightings);
router.get('/sightings/ghost/:ghost', getSightingsByGhost);
router.get('/sightings/location/:searchterm', getSightingsByLocation);
router.get('/sightings/locations', getSightingLocations);
router.delete('/sightings/:id', deleteSightingByID);
router.patch('/sightings/:id', updateSighting);

router.put('/ghosts/create', createGhost);
router.get('/ghosts/all', getAllGhosts);
router.get('/ghosts/name/:name', getGhostByName);
router.get('/ghosts/id/:id', getGhostByID);
router.delete('/ghosts/id/:id', deleteGhostByID);
router.patch('/ghosts/id/:id', updateGhost);

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

function updateUser(request, response, next) {
    let id = parseInt(request.params.id);
    let diff = request.body;

    console.log(`Received request to update a user with id ${id}`);
    dbService.updateUser(diff, id) 
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

// GET ALL SIGHTINGS IDENTIFIED BY A GHOST
function getSightingsByGhost(request, response, next) {
    const ghost = request.params.ghost;

    console.log(`Received request to get sightings with ghost ${ghost}`);
    dbService.getSightingsByGhost(ghost)
        .then (results => {
            if (results.length == 0) {
                response.status(404).json({
                    message: `No sightings found for ghost: ${ghost}`
                })
            }
            else {
                response.send(JSON.stringify(results));
            }
        })
        .catch( err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// GET ALL SIGHTINGS THAT FUZZE MATCH A LOCATION
function getSightingsByLocation(request, response, next) {
    const searchTerm = request.params.searchterm;
    console.log(`Received a request to get sightings with location ${searchTerm}`);
    dbService.getSightingsByLocation(searchTerm)
        .then( (results) => {
            if (results.length == 0) {
                response.status(404).json({
                    message: `No sightings found with a location matching ${searchTerm}`
                })
            }
            else {
                response.send(JSON.stringify(results));
            }
        })
        .catch (err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// GET ALL DISTINCT LOCATIONS FROM SIGHTINGS
function getSightingLocations(request, response, next) {
    console.log(`Received request to get sighting locations`);
    dbService.getSightingLocations()
        .then(results => {
            let locations = [];
            results.forEach((locObject) => {
                locations.push(locObject["location"]);
            })
            response.send(JSON.stringify(locations));
        })
        .catch (err => {
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

// CREATE A GHOST, BODY PARAMS OF NAME AND BIOGRAPHY
function createGhost(request, response, next) {
    if (!request.body.name) {
        response.status(400).json({
            message: `Must specify a ghost name in your request!`
        })
    }

    if (!request.body.biography) {
        response.status(400).json({
            message: `Must specify a ghost biography!`
        })
    }
    let name = request.body.name;
    let bio = request.body.biography;

    console.log(`received request to create a ghost with name ${name}`);

    // CHECK TO SEE IF THE GHOST ALREADY EXISTS
    dbService.getGhostByName(name)
        .then( ghost => {

            // IF THE GHOST ALREADY EXISTS
            if (ghost) {
                response.status(400).json({
                    message: 'A ghost with that name already exists!'
                })
            }

            // IF IT DOES EXIST CREATE IT
            else {
                dbService.createGhost(name, bio)
                    .then( results => {
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
        })
    
}

function updateGhost(request, response, next) {
    let id = parseInt(request.params.id);
    let diff = request.body;
    console.log(`Received request to update a ghost with id ${id}`);
    dbService.updateGhost(diff, id)
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

// GET ALL GHOSTS
function getAllGhosts(request, response, next) {
    dbService.getAllGhosts()
        .then( results => {
            response.send(JSON.stringify(results));
        })
        .catch (err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// GET A GHOST BY NAME
function getGhostByName(request, response, next) {

    
    const name = request.params.name;
    console.log(`Received request to get ghost by name with name ${name}`);

    dbService.getGhostByName(name)
        .then( ghost => {
            if (ghost) {
                response.send(JSON.stringify(ghost));
            }
            else {
                response.status(404).json({
                    message: 'ghost not found'
                })
            }
        })
        .catch (err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// GET A GHOST BY ID
function getGhostByID(request, response, next) {
    const id = request.params.id;
    console.log(`Received request to get ghost by id with id ${id}`);

    dbService.getGhostByID(id)
        .then( ghost => {
            if (ghost) {
                response.send(JSON.stringify(ghost));
            }
            else {
                response.status(404).json({
                    message: 'ghost not found'
                })
            }
        })
        .catch (err => {
            response.status(500).json({
                message: `Error: ${err}`
            })
        })
}

// DELETE A GHOST BY ID
function deleteGhostByID(request, response, next) {
    const id = request.params.id;

    dbService.deleteGhostByID(id)
        .then( results => {
            response.status(200).json({
                message: `OK`
            })
        })
        .catch( err => {
            response.status(500).json({
                message: `Error ${err}`
            })
        })
}


module.exports = router;