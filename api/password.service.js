const bcrypt = require('bcryptjs');


// USE BCRYPT TO GENERATE A PASSWORD SALT
function generateSalt() {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(salt);
            }
        })
    })
}

// USE BCRYPT TO GENERATE A HASH
function generateHash(password, salt) {
    return new Promise( (resolve, reject) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject (err);
            }
            else {
                resolve(hash);
            }
        })
    })
}

// USE BCRYPT TO COMPARE PASSWORDS
function comparePassword(userPassword, DBHash) {
    return new Promise ( (resolve, reject) => {
        bcrypt.compare(userPassword, DBHash, (err, isMatch) => {
            if (err) {
                reject(err);
            }
            else {
                resolve (isMatch);
            }
        })
    })
}

// EXPORTS
module.exports = {
    generateSalt,
    generateHash,
    comparePassword
}