// Access enviroment variables
require('dotenv').config();

// Express
const express = require('express');
const app = express();

// Mongoose - mongodb
const mongoose = require('mongoose');
// Connect to DB
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connection: OK.');
    app.emit('ready');
  })
  .catch(err => console.log(err));

const csrf = require('csurf');
const flash = require('connect-flash');
// const helmet = require('helmet'); // -- requires an https-enabled website
const MongoStore = require('connect-mongo');
const session = require('express-session');
const path = require('path');
const routes = require('./routes');
const { checkCsrfError, csrfMiddleware, globalMiddleware } = require('./src/middlewares/middleware');

// app.use(helmet()); // -- requires an https-enabled website

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Setup express-session options
const sessionOptions = session({
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'strict',
    // secure: true, // -- requires an https-enabled website
  },
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// CSRF Protection - Cross-Site Request Forgery
app.use(csrf());
// Custom middlewares
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
// Routes
app.use(routes);

app.on('ready', () => {
  app.listen(3000, () => {
    console.log('Server on port 3000.');
    console.log('Access: http://localhost:3000');
  });
});
