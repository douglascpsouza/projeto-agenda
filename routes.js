const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController');

// Home route
route.get('/', homeController.index);

// Login routes
route.get('/login', loginController.index);

// Register routes
route.get('/register', registerController.index);
// route.post('/register', )

module.exports = route;
