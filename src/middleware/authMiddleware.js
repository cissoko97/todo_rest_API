const jwt = require('jsonwebtoken');
const JWT_SIGN_SECRET = 'mon super mot pour masquer mes données';
//importation de la cle de securite de lapplication
module.exports = {
    checkAuthorization: (req, res, next) => {
        if (req.headers['authorization']) {
            let token = req.headers['authorization'].replace('Bearer ', '');
            try {
                jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken)
                    req.userId = jwtToken.userId;
            } catch (error) {
                return res.status(403).json({ ...error });
            }
        } else {
            return res.status(403).json({ message: 'forbidden access' })
        }
        next();
    },
}