const mysql = require('mysql');
const dbconfig = require('../../config/db_config');
const utilService = require('./utils.service');

// CREATE RAW CONNECTION WHICH CAN BE QUERIED. AVOID USING ME! PROBABLY SHOULDN'T BE EXPOSED TO CLIENT CODE
function connection() {
    return mysql.createConnection(dbconfig)
}

// RETURN JSON RESULT OF A QUERY
function query(queryString /*string*/) {
    return new Promise((resolve, reject) => {
        connection().query(queryString, (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// GET A SINGLE USER
function getUser(email /*string*/) {
    return new Promise((resolve, reject) => {
        const q = `SELECT users.*, roles.role 
                    FROM users 
                    LEFT JOIN roles
                    ON users.roleid = roles.id
                    WHERE users.email = '${email}' LIMIT 1`
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject (error);
            }

            if (results) {
                resolve(results[0]);
            }
            else {
                resolve(false);
            }
        })
    })
}

// GET ALL USERS
function getAllUsers() {
    return new Promise( (resolve, reject) => {
        const q = `SELECT users.*, roles.role
                        FROM users
                        LEFT JOIN roles
                        ON users.roleid = roles.id`;
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }
        })
    })
}
// GET USER BY ID
function getUserById(id) {
    return new Promise( (resolve, reject) => {
        const q = `SELECT users.*, roles.role
                    FROM users
                    LEFT JOIN roles
                    ON users.roleid = roles.id
                    WHERE users.id = ${id} LIMIT 1`;
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else if (results) {
                resolve(results[0]);
            }
            else {
                reject(false);
            }
        })
    })
}
// CREATE A SINGLE USER
function createUser(user /*user object*/) {
    return new Promise((resolve, reject) => {
        connection().query(`INSERT INTO users (email, hash, roleid, firstname, lastname)
        VALUES ('${user.email}', '${user.hash}', '${user.roleid}', '${user.firstname}', '${user.lastname}')`,
        (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// UPDATE A USER
function updateUser(diff, id) {
    return new Promise ( (resolve, reject) => {
        let query = `UPDATE users SET `;
        for (let key in diff) {
            
            // IF THE VALUE IS NUMERIC, DON'T USE QUOTES, OTHERWISE, DO USE THEM
            if (utilService.isNumeric(diff[key])) {
                let v = parseInt(diff[key]);
                query += `${key} = ${v}, `;
            }
            else {
                query += `${key} = '${diff[key]}', `;
            }
        }

        // REMOVE THE TRAINING COMMA AND SPACE
        query = query.replace(/,\s*$/, "");

        // ADD THE WHERE CLAUSE
        query += ` WHERE id = ${id}`;

        // MAKE THE QUERY
        connection().query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// CREATE A SIGHTING
function createSighting(sighting) {
    return new Promise((resolve, reject) => {
        connection().query(`INSERT INTO sightings (reporterid, ghostid, month, year, day, location, title, description, imageurl, spookiness)
        VALUES (${sighting.reporterid}, ${sighting.ghostid}, ${sighting.month}, ${sighting.year}, ${sighting.day},  '${sighting.location}', '${sighting.title}', '${sighting.description}', '${sighting.imageurl}', ${sighting.spookiness})`,
        (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }
            
        })
    })
}

// GET ALL SIGHTINGS
function getAllSightings(){
    return new Promise((resolve, reject) => {
        const q = `SELECT sightings.*, 
                        ghosts.name as ghostname, 
                        ghosts.biography as ghostbio, 
                        users.email as reporteremail,
                        users.firstname as reporterfirstname,
                        users.lastname as reporterlastname
                    FROM sightings
                    LEFT JOIN ghosts
                        ON sightings.ghostid = ghosts.ghostid
                    LEFT JOIN users
                        ON sightings.reporterid = users.id`;
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }

        })
    })
}

// GET SIGHTING BY DATE
function getSightingsByDate(month, year) {
    return new Promise( (resolve, reject) => {
        const q = `SELECT sightings.*, 
                        ghosts.name as ghostname, 
                        ghosts.biography as ghostbio, 
                        users.email as reporteremail,
                        users.firstname as reporterfirstname,
                        users.lastname as reporterlastname
                    FROM sightings
                    LEFT JOIN ghosts
                        ON sightings.ghostid = ghosts.ghostid
                    LEFT JOIN users
                        ON sightings.reporterid = users.id
                    WHERE sightings.month = ${month} 
                        AND sightings.year = ${year}`;
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
            resolve(results);
            }
        })
    })
}

// GET SIGHTINGS BY GHOST
function getSightingsByGhost(ghost) {
    
    const q = `SELECT sightings.*,
                        ghosts.name as ghostname, 
                        ghosts.biography as ghostbio, 
                        users.email as reporteremail,
                        users.firstname as reporterfirstname,
                        users.lastname as reporterlastname
                FROM sightings
                LEFT JOIN ghosts
                    ON sightings.ghostid = ghosts.ghostid 
                LEFT JOIN users
                    ON sightings.reporterid = users.id
                WHERE ghosts.name LIKE '%${ghost}%'`;
    
    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// GET ALL LOCATIONS WE HAVE SIGHTINGS AT
function getSightingLocations() {
    return new Promise( (resolve, reject) => {
        connection().query(`SELECT DISTINCT location FROM sightings`, (error, results, fields) => {
            if (error ) {
                reject (error);
            }
            else {
                resolve(results); 
            }
        })
    })
}

// GET SIGHTINGS BY FUZZY LOCATION MATCH
function getSightingsByLocation(locSearchString) {
    const q = `SELECT sightings.*,
                        ghosts.name as ghostname, 
                        ghosts.biography as ghostbio, 
                        users.email as reporteremail,
                        users.firstname as reporterfirstname,
                        users.lastname as reporterlastname
                FROM sightings 
                LEFT JOIN ghosts
                    ON sightings.ghostid = ghosts.ghostid
                LEFT JOIN users
                    on sightings.reporterid = users.id
                WHERE sightings.location LIKE '%${locSearchString}%'`;
    
    return new Promise ( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

function getSightingsByReporterID(reporterID) {
    const q = `SELECT sightings.*,
                    ghosts.name as ghostname, 
                    ghosts.biography as ghostbio, 
                    users.email as reporteremail,
                    users.firstname as reporterfirstname,
                    users.lastname as reporterlastname
                FROM sightings 
                LEFT JOIN ghosts
                    ON sightings.ghostid = ghosts.ghostid
                LEFT JOIN users
                    ON sightings.reporterid = users.id
                WHERE sightings.reporterid = ${reporterID}`;

    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

function getSightingByID(sightingID) {
    const q = `SELECT sightings.*,
                    ghosts.name as ghostname, 
                    ghosts.biography as ghostbio, 
                    users.email as reporteremail,
                    users.firstname as reporterfirstname,
                    users.lastname as reporterlastname
                FROM sightings 
                LEFT JOIN ghosts
                    ON sightings.ghostid = ghosts.ghostid
                LEFT JOIN users
                    ON sightings.reporterid = users.id
                WHERE sightings.sightingid = ${sightingID}`;
    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else if (results) {
                resolve(results[0]);
            }
            else {
                reject(false);
            }
        })
    })
}
// DELETE A SIGHTING
function deleteSightingByID(sightingID) {
    return new Promise ( (resolve, reject) => {
        connection().query(`DELETE FROM sightings WHERE sightings.sightingid = ${sightingID}`, 
        (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// UPDATE A SIGHTING
function updateSighting(diff, id) {
    
    return new Promise( (resolve, reject) => {

        // ITERATE ACROSS KEY/VALUE PAIRS IN THE DIFF TO CREATE THE STATEMENT
        let query = `UPDATE sightings SET `;
        for (let key in diff) {
            
            // IF THE VALUE IS NUMERIC, DON'T USE QUOTES, OTHERWISE, DO USE THEM
            if (utilService.isNumeric(diff[key])) {
                let v = parseInt(diff[key]);
                query += `${key} = ${v}, `;
            }
            else {
                query += `${key} = '${diff[key]}', `;
            }
        }

        // REMOVE THE TRAINING COMMA AND SPACE
        query = query.replace(/,\s*$/, "");

        // ADD THE WHERE CLAUSE
        query += ` WHERE sightingid = ${id}`;

        // MAKE THE QUERY
        connection().query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        });
    })
}

// CREATE A GHOST
function createGhost(name, bio) {
    const q = `INSERT INTO ghosts (name, biography)
                VALUES ('${name}', '${bio}')`;
    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// UPDATE A GHOST
function updateGhost(diff, id) {
    return new Promise( (resolve, reject) => {
        // ITERATE ACROSS KEY'VALUE PARIS IN THE DIFF
        let query = `UPDATE ghosts SET `;
        for (let key in diff) {

            if (utilService.isNumeric(diff[key])) {
                let v = parseInt(diff[key]);
                query += `${key} = ${v}, `;
            }
            else {
                query += `${key} = '${diff[key]}', `;
            }
        }

        // REMOVE THE TRAILING COMMA AND SPACE
        query = query.replace(/,\s*$/, "");

        // ADD THE WHERE CLAUSE
        query += ` WHERE ghostid = ${id}`;

        // MAKE THE QUERY
        connection().query(query, (error, results, fields) => {
            if (error) {
                reject (error);
            }
            else {
                resolve(results);
            }
        })
    })
}

// GET A GHOST BY NAME
function getGhostByName(name) {
    const q = `SELECT * FROM ghosts
                WHERE name LIKE '${name}' LIMIT 1`;
    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject (error);
            }
            if (results) {
                resolve(results[0]);
            }
            else {
                resolve(false);
            }
        })
    })
    
}

// GET A GHOST BY ID
function getGhostByID(id) {
    const q = `SELECT * FROM ghosts
                WHERE  ghostid = ${id}
                LIMIT 1`;
    return new Promise ( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            if (results) {
                resolve(results[0]);
            }
            else {
                resolve(false);
            }
        })
    })
}

// DELETE GHOST BY ID
function deleteGhostByID(id) {
    const q = `DELETE FROM ghosts
                WHERE ghostid = ${id}`;

    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject (error);
            }

            else {
                resolve(results);
            }
        })
    })
}

function getAllGhosts() {
    const q = `SELECT * FROM ghosts`;
    return new Promise( (resolve, reject) => {
        connection().query(q, (error, results, fields) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results);
            }
        })
    })
}


module.exports =  {
    query,
    getUser,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    getAllSightings,
    createSighting,
    getSightingsByDate,
    getSightingsByGhost,
    getSightingLocations,
    getSightingsByLocation,
    getSightingsByReporterID,
    getSightingByID,
    deleteSightingByID,
    updateSighting,
    createGhost,
    updateGhost,
    getGhostByName,
    getGhostByID,
    getAllGhosts,
    deleteGhostByID
}