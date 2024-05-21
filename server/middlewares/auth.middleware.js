const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-auth-token"];

    if(!token)
    {
        return res.status(403).send("No token provided");
    }
    jwt.verify(token, "some secret", (err, decoded) => {
        if (err) {
            return res.status(401).send("Token not verified");
        }
        req.userId = decoded.id;
        next();
    })
}

const db = require("../models");

const existingUser = (req, res, next) => {
    db.user.findOne({email: req.body.email}).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            next();
        }
        else {
            return res.status(401).send({message:`User with ${req.body.email} already exists`});
        }
    })
}

module.exports = {
    verifyToken,
    existingUser
}