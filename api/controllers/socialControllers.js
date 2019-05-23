const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  User.find({})
    .sort('lastName')
    .exec((error, users) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble finding all users' });
      }
      return res.status(200).json({users});
    })
}

exports.getProfileById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({message: "Please provide an id parameter"});
  }
  User.findOne({ _id: req.params.id })
    .populate({
      path: 'friends',
      select: 'firstName lastName'
    })
    .exec((error, user) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble finding user'});
      }
      return res.status(200).json({user});
    })
}

exports.addFriend = (req, res) => {
  // Validation handling
  if (!req.body.id) {
    return res.status(400).json({message: "Please provide an id"});
  }
  // To use $push we need to ensure that our model has property usePushEach: true
  // { new: true } returns the updated user not the one before the update
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: {friends: req.body.id}},
    {new: true},
    (error, user) => {
      if (error) {
        console.log('test');
        return res.status(400).json({error, message: 'Trouble adding friend'});
      }
      return res.status(200).json({user});
    }
  )
}
