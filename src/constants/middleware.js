const jwtToken = require("jsonwebtoken");
const { use } = require("../routes/userRoutes");


module.exports.isAuthorized = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        const token = authorization && authorization.split(' ')[1];
        if (token == null) return res.status(401).json({
            status: 401,
            message: 'invalid token' + error.message,
            result: null
        });

        jwtToken.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(401).json({
                status: 401,
                message: 'invalid token',
                result: null
            });
            req.body.userId = user.user.id;
            next();
        });

    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'invalid token',
            result: null
        });
    }
};