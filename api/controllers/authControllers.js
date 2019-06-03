// Require dependencies
const jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs')
      User = require('../models/User'),
      config = require('../config/secret');


exports.register = (req, res) => {
  if (!req.body.password) {
    return res.status(400).json({ message: 'Password required' });
  }
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      return res.status(400).json({message: 'Username already exists'});
    }
    const newUser = new User({ ...req.body });
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((error, savedUser) => {
      if (error) {
        return res.status(400).json({ error, message: 'Trouble saving new user'});
      }
      return res.status(200).json({
        user: savedUser,
        token: jwt.sign({ username: savedUser.username, _id: savedUser._id}, config.key)
      });
    })
  })
}

exports.login = (req, res) => {
  if (!req.body.username) {
    return res.status(401).json({message: "Authentication failed, please provide username" });
  }
  if (!req.body.password) {
    return res.status(401).json({message: "Authentication failed, please provide password" });
  }
  User.findOne({ username: req.body.username }, (error, user) => {
    if (error) {
      return res.status(401).json({ error, message: 'Could not find user' });
    }
    if (!user.comparePassword(req.body.password, user.password)) {
      return res.status(401).json({ message: 'Authentication failed, incorrect password for username'})
    }
    return res.status(200).json({ user, token: jwt.sign({ username: user.username, _id: user._id }, config.key) });
  })
}

exports.getProfile = (req, res) => {
  User
    .findOne({ _id: req.user._id })
    .populate({
      path: 'friends',
      select: 'firstName lastName'
    })
    .exec((error, user) => {
      if (error) {
        return res.status(400).json({error, message: 'Cannot fetch profile'});
      }
      return res.status(200).json({user});
    })
}

// Middleware to protect routes that you need to be logged in to see
exports.loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!" });
  }
}
