const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'mon super mot pour masquer mes données';

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isadmin
        },
            JWT_SIGN_SECRET,
            { expiresIn: '1h' }
        )
    }
}