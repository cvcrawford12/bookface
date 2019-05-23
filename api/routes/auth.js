const authControllers = require('../controllers/authControllers');

/*
  Routes: login, register
*/
module.exports = (app) => {
  app.route('/auth/register')
    .post(authControllers.register);

  app.route('/auth/login')
    .post(authControllers.login);
}
