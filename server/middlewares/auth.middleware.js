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
module.exports = {
    verifyToken
}