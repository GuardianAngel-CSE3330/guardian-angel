const jwtService = require('../services/jwt.service');

function authGuard(request, response, next) {

    // CHECK FOR PRESENCE OF TOKEN
    if (!request.token) {
        response.status(401).json({
            message: "Unauthorized: missing token"
        })
    }

    // HANDLE TOKEN
    else {
        let tokenIsValid = jwtService.verifyToken(request.token);

        if (tokenIsValid) {
            next();
        }

        else {
            response.status(401).json({
                message: "Unauthorized: invalid token"
            })
        }
    }
}

module.exports = authGuard;