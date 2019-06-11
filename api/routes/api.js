const authControllers = require('../controllers/authControllers');
const apiControllers = require('../controllers/apiControllers');
const upload = require('../middleware/fileUpload');

module.exports = (app) => {
  app.route('/api/search')
    .get(authControllers.loginRequired, apiControllers.searchUsers);

  app.route('/api/friends/search')
    .post(authControllers.loginRequired, apiControllers.searchFriends);

  app.route('/api/upload/profileImg')
    .put(authControllers.loginRequired, upload.upload.single('file'), apiControllers.uploadProfileImg)
}
