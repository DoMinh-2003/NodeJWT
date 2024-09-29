const jwt = require('jsonwebtoken');
const auth = require("../models/auth");


const exemptedRoutes = [
    '/api/login',
    '/api/register',
    '/api/login-google'
];

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (exemptedRoutes.includes(req.originalUrl)) {
        return next(); 
    }

    if (!authHeader) {
        return res.status(403).send('Token is required!');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized!');
        }

        try {
            const user = await auth.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Server error while retrieving user.' });
        }

    });
}


module.exports =  verifyToken 
