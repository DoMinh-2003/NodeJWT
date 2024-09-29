const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'User not authenticated!' });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: Insufficient rights' });
        }
        next();
    };
};

module.exports =  checkRole 