// Require out dependencies for our API
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken')
      cors = require('cors'),
      config = require('./config/secret'),
      path = require('path'),
      app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Require Routes (API endpoints)
const authRoutes = require('./routes/auth');
const socialRoutes = require('./routes/social');
const apiRoutes = require('./routes/api');

// Intialize database
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('Database Connected'))
  .catch((e) => console.log(e));

// Use Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY, (err, decoded) => {
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
apiRoutes(app);

// Pass all routes to index file from webpack build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname));
  app.use(express.static(path.resolve(__dirname + '../../client/build')));
  app.get('*', (res, res) => {
    res.sendFile(path.resolve(__dirname + '../../client/build/index.html'));
  })
}

app.listen(process.env.PORT || config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
