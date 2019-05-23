const loginRequired = require('../controllers/authControllers').loginRequired;
const socialControllers = require('../controllers/socialControllers');

/*
  Routes: getProfileById, getAllUsers, postNewPost, getAllPosts
*/

module.exports = (app) => {
  // Returns all users
  app.route('/profile/all')
    .get(loginRequired, socialControllers.getAllUsers);

  // Returns a specific users profile
  app.route('/profile/user/:id')
    .get(loginRequired, socialControllers.getProfileById);

  app.route('/profile/addFriend')
    .post(loginRequired, socialControllers.addFriend);
}
