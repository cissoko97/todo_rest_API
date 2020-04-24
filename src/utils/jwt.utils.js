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
    },

    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserId: function (authorization, res) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        console.log('Verify', token)
        if (token) {
            try {
                jwtResponse = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtResponse) {
                    userId = jwtResponse.userId;
                }
            } catch (error) {
                return res.status(500).json({ ...error });
            }
        }
        if (userId === -1) {
            return res.status(401).json({ 'error': 'wrong Token' })
        } else {
            return userId;
        }
    },

    checkAuthorization: (req, res, next) => {
        let token = mreq.headers['authorization'];
        if (token != null) {
            try {
                jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId;
            } catch (err) {
                return res.status(500).json({ error: "Error on decode Token" })
            }
        }
        if (userId === -1) {
            return res.status(403).json({ 'error': 'wrong Token Forbidden Acces' })
        }
        req.userId = userId;
        return next();
    }
}
