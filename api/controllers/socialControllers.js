const User = require('../models/User'),
      Post = require('../models/Post'),
      Comment = require('../models/Comment');

exports.getAllUsers = (req, res) => {
  User
    .find({})
    .sort('lastName')
    .exec((error, users) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble finding all users' });
      }
      return res.status(200).json({users});
    })
}

exports.getAllFriends = (req, res) => {
  User
    .find({})
    .where('_id').in(req.body.friends)
    .exec((error, users) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble finding friends'});
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
      select: 'firstName lastName avatar'
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
        return res.status(400).json({error, message: 'Trouble adding friend'});
      }
      return res.status(200).json({user});
    }
  )
}

exports.deleteFriend = (req, res) => {
  // Validation handling
  if (!req.body.id) {
    return res.status(400).json({message: "Please provide an id"});
  }
  // To use $pull we need to ensure that our model has property usePushEach: true
  // { new: true } returns the updated user not the one before the update
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: {friends: req.body.id}},
    {new: true},
    (error, user) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble deleting friend'});
      }
      return res.status(200).json({user});
    }
  )
}

exports.editProfile = (req, res) => {
  let data = { ...req.body };
  if (req.file) {
    data.avatar = req.file.location;
    data.info = JSON.parse(data.info);
    data.favorites = JSON.parse(data.favorites);
    data.hobbies = JSON.parse(data.hobbies);
  }
  User.findOneAndUpdate({ _id: req.user._id }, data, { new: true }, (error, user) => {
    if (error) {
      return res.status(400).json({ error, message: 'Trouble updating user'});
    }
    return res.status(200).json({user});
  });
}

exports.getAllPosts = (req, res) => {
  Post.find({})
    .sort({createdAt: -1})
    .populate({
      path: 'author',
      select: 'firstName lastName avatar'
    })
    .exec((error, posts) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble retrieving posts'});
      }
      return res.status(200).json({posts});
    });
}

exports.createNewPost = (req, res) => {
  if (!req.body.postText) {
    return res.status(400).json({message: 'Please provide some text for the post'});
  }
  let newPost = new Post({ author: req.user._id, postText: req.body.postText });
  if (req.file) {
    newPost['image'] = req.file.location;
  }
  newPost.save((error, post) => {
    if (error) {
      return res.status(400).json({error, message: 'Trouble saving new post'});
    }
    return res.status(200).json({post});
  })
}

exports.createNewComment = (req, res) => {
  if (!req.body.postId || !req.body.commentText) {
    return res.status(400).json({message: 'Please provide a postId and comment text'});
  }
  const newComment = new Comment({ ...req.body, author: req.user._id }).save((error, comment) => {
    if (error) {
      return res.status(400).json({error, message: 'Trouble saving new comment'});
    }
    Post.findOneAndUpdate(
      { _id: comment.postId },
      {$push: { comments: comment }},
      {new: true},
      (error, post) => {
        if (error) {
          return res.status(400).json({error, message: 'Trouble adding comment to post'});
        }
        return res.status(200).json({post, comment});
      }
    )
  });
}

exports.getCommentsForPost = (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({message: 'Please provide a postId'});
  }
  // Nested populate to get comment text and author name of comment
  Post
    .findOne({_id: req.params.postId})
    .populate({
      path: 'comments',
      select: 'commentText',
      populate: {
        path: 'author',
        select: 'firstName lastName avatar',
        model: 'users'
      }
    })
    .sort({createdAt: -1})
    .exec((error, post) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble getting comments for post'});
      }
      return res.status(200).json({comments: post.comments});
    })
}

exports.likePost = (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({message: 'Please provide a postId'});
  }
  Post
    .findOneAndUpdate(
      {_id: req.params.postId},
      {$push: {usersLiked: req.user._id}},
      {new: true}
    )
    .exec((error, post) => {
      if (error) {
        return res.status(400).json({error, message: 'Trouble liking post'});
      }
      return res.status(200).json({post});
    })
}

exports.unlikePost = (req, res) => {
  if (!req.params.postId) {
    return res.status(400).json({message: 'Please provide a postId'});
  }
  Post
    .findOneAndUpdate(
      {_id: req.params.postId},
      {$pull: {usersLiked: req.user._id}},
      {new: true},
      (error, post) => {
        if (error) {
          return res.status(400).json({error, message: 'Trouble liking post'});
        }
        return res.status(200).json({post});
      }
    )
}
