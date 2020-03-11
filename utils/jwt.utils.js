const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'mon super mot pour masquer mes données';

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isadmin
            },
            JWT_SIGN_SECRET,
            {expiresIn: '1h'}
        )
    },

    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserId: function (authorization, res) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) {

            }
        }
        if (userId === -1) {
            return res.status(401).json({'error': 'wrong Token'})
        }
        return userId;
    }
}
