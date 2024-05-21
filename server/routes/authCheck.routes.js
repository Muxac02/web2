const middlewares = require("../middlewares/auth.middleware");

module.exports = function(app) {
    app.get("/auth/requireToken", [middlewares.verifyToken], (req, res) => {
        res.status(200).send("requireToken route")
    });
    app.get('/auth/notRequireToken' , (req, res) => {
        res.status(200).send("notRequireToken route")
    });
}