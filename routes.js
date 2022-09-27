const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');
const loginController = require('./src/controllers/loginController');
const logoutController = require('./src/controllers/logoutController');
const registerController = require('./src/controllers/registerController');

const { loginRequired } = require('./src/middlewares/middleware');

// Home route
route.get('/', loginRequired, homeController.index);

// Contact routes
route.get('/contact', loginRequired, contactController.index);
route.post('/contact', contactController.create);
route.get('/contact/:id', loginRequired, contactController.edit);
route.post('/contact/:id', contactController.update);
route.get('/contact/delete/:id', loginRequired, contactController.delete);

// Login routes
route.get('/login', loginController.index);
route.post('/login', loginController.login);

// Logout route
route.get('/logout', logoutController.index);

// Register routes
route.get('/register', registerController.index);
route.post('/register', registerController.register);

module.exports = route;
