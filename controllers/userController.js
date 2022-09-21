const config = require('../config');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

exports.signUp = async function(req, res) {
    let newUser = new User(req.body);
    // first_name --> User.first_name 
    const salt = bcrypt.genSaltSync(10);
    if (req.body.password){
        newUser.hash_password = bcrypt.hashSync(req.body.password, salt);
    }  else {
        return res.status(400).json({ error: 'Please send password '});
    }

    /** 
     * 
     * FORMA PROMISE
    User.create(req.body).then(
        function (value) {
            return res.json({user});
        }
    ).catch(
        function(err) {
            return res.status(400).send(error);
        }
    )
    **/

    /** 
    * FORMA AWAIT
    const newUser = await User.create(req.body);
    if (!newUser) {
        console.log('something occured'):
    }
    **/
    
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                err
            });
        } else {
            return res.json({user});
        }
    });
}

exports.logIn = function(req, res) {
    User.findOne({ email: req.body.email },
        function(err, user) {
            if (err) {
                return res.status(400).json({ error: err });
            }
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    message: "Auth failed, invalid user or password"
                });
            }

            return res.json({ token: jwt.sign({ email: user.email, _id: user._id }, config.secret, { expiresIn: '48h' }) });
        })
}

exports.getUser = async function(req, res, next) {
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(401).json({ error: 'Something failed '});
    }

    return res.json({ user: user.toJson() });
}

