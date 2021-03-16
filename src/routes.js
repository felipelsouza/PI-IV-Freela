const express = require('express');

const userController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', userController.index);

module.exports = routes;