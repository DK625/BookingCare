const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            // khi verify trả về 1 là lỗi, 2 là user (data) khi verify success
            if (err) {
                res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndUserAuthorization,
    verifyTokenAndAdmin,
};
