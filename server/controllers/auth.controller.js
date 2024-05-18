const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.user;

const signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err,user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        res.status(200).send({message: "User successfully saved"});
        console.log(`User with ${user.username} is saved`);
    })
}

const signin = (req, res) => {
    User.findOne({username: req.body.username}).exec((err,user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (!user) {
            res.status(404).send({message: `There is no username with ${req.body.username}`});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (passwordIsValid) {
            const token = jwt.sign({id: user.id}, "some secret", {expiresIn: req.body.remember?(1000*60):(1000*60*60*24)});
            res.status(200).send({message: "User authenticated", user: {
                username: user.username,
                nickname: user.nickname,
                email: user.email,
                token
                }});
        } else {
            res.status(404).send({message: "Wrong username or password"});
        }
    })
}

module.exports = {
    signup,
    signin
}