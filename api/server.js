// Require out dependencies for our API
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken')
      cors = require('cors'),
      config = require('./config/secret'),
      app = express();

// Require Routes (API endpoints)
const authRoutes = require('./routes/auth');
const socialRoutes = require('./routes/social');

// Intialize database
mongoose
  .connect(config.db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('Database Connected'))
  .catch((e) => console.log(e));

// Use Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow CORS (cross-origin) requests and non-standard methods (e.g. PUT/DELETE)
app.use(cors())
app.options('*', cors())
app.use((req, res, next) => {
  // This allows us to access user object without having to pass it from frontend
  res.locals.user = req.user;
  next();
});

// Use JWT Authentication
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.key, (err, decoded) => {
      if (err) {
        req.user = undefined;
        next();
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    req.user = undefined;
    next();
  }
})

// Instantiate Routes
authRoutes(app);
socialRoutes(app);

app.listen(process.env.PORT || config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
