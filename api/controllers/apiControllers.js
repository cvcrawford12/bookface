const mongoose = require('mongoose'),
      User = require('../models/User');

exports.searchUsers = (req, res) => {
  if (!req.query.searchString) {
    return res.status(400).json({ message: 'Please provide a search string' });
  }
  const queryExpression = new RegExp(req.query.searchString, 'i');
  User
    .find()
    .or([
      {firstName: {$regex: queryExpression}},
      {lastName: {$regex: queryExpression}},
      {username: {$regex: queryExpression}}
    ])
    .select('firstName lastName bio info favorites')
    .exec((error, users) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble searching database' });
      }
      return res.status(200).json({users});
    });
}

exports.searchFriends = (req, res) => {
  if (!req.query.searchString) {
    return res.status(400).json({ message: 'Please provide a search string' });
  }
  if (!req.body.friends) {
    return res.status(400).json({ message: 'Please provide friends to search through' });
  }
  const queryExpression = new RegExp(req.query.searchString, 'i');
  User
    .find()
    .or([
      {firstName: {$regex: queryExpression}},
      {lastName: {$regex: queryExpression}},
      {username: {$regex: queryExpression}}
    ])
    .where('_id').in(req.body.friends)
    .select('firstName lastName bio info favorites')
    .exec((error, users) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble searching database' });
      }
      return res.status(200).json({users});
    })
}
