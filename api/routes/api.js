const authControllers = require('../controllers/authControllers');
const apiControllers = require('../controllers/apiControllers');

module.exports = (app) => {
  app.route('/api/search')
    .get(authControllers.loginRequired, apiControllers.searchUsers);
    
  app.route('/api/friends/search')
    .post(authControllers.loginRequired, apiControllers.searchFriends);
}
