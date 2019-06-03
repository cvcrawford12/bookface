const loginRequired = require('../controllers/authControllers').loginRequired;
const socialControllers = require('../controllers/socialControllers');

/*
  Routes: getProfileById, getAllUsers, postNewPost, getAllPosts
*/

module.exports = (app) => {
  // Returns all users
  app.route('/profile/all')
    .get(loginRequired, socialControllers.getAllUsers);

  app.route('/friends/all')
    .post(loginRequired, socialControllers.getAllFriends);

  // Returns a specific users profile
  app.route('/profile/user/:id')
    .get(loginRequired, socialControllers.getProfileById);

  app.route('/profile/addFriend')
    .put(loginRequired, socialControllers.addFriend);

  app.route('/profile/deleteFriend')
    .put(loginRequired, socialControllers.deleteFriend);

  app.route('/profile/edit')
    .put(loginRequired, socialControllers.editProfile);

  app.route('/social/create/post')
    .post(loginRequired, socialControllers.createNewPost);

  app.route('/social/create/comment')
    .put(loginRequired, socialControllers.createNewComment);

  app.route('/social/posts')
    .get(loginRequired, socialControllers.getAllPosts);

  app.route('/social/comments/:postId')
    .get(loginRequired, socialControllers.getCommentsForPost);

  app.route('/social/post/like/:postId')
    .put(loginRequired, socialControllers.likePost);

  app.route('/social/post/unlike/:postId')
    .put(loginRequired, socialControllers.unlikePost);
}
