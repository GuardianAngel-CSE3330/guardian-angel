const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../config/key').token;     // FOR SIGNING JWT TOKENS
const _ = require('lodash');
///////////////////////////////////////////////////
// CREATE A JWT TOKEN
///////////////////////////////////////////////////
function createToken(user) {
    return jwt.sign(_.omit(user, ['hash']), JWT_KEY, {expiresIn: 60 * 60 * 5});
}

function verifyToken(token) {
    return jwt.verify(token, JWT_KEY);
}


///////////////////////////////
// THIS GOES LAST
///////////////////////////////
module.exports = {
    createToken,
    verifyToken
}