const express = require('express');

const employerController = require('./controllers/EmployerController');

const routes = express.Router();

routes.post('/employer', employerController.create);
routes.get('/employer/:id', employerController.index);
routes.put('/employer/:id', employerController.update);
routes.delete('/employer/:id', employerController.destroy);

module.exports = routes;
