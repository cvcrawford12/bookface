const jwt = require('jsonwebtoken'),
      config = require('../config/secret');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    // Verify token
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.status(401).json({error: true, message: "Unauthorized user!"});
      }
      console.log(decoded);
      req.decoded = decoded;
      // Since this is middleware we want to proceed on success
      next();
    });
  } else {
    // Forbidden access without token
    return res.status(401).json({ error: true });
  }
}
