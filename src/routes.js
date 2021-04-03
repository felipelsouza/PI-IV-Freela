const express = require('express');

const employerController = require('./controllers/EmployerController');
const employeeController = require('./controllers/EmployeeController');

const routes = express.Router();

routes.post('/employer', employerController.create);
routes.get('/employers', employerController.list);
routes.get('/employer/:id', employerController.index);
routes.put('/employer/:id', employerController.update);
routes.delete('/employer/:id', employerController.destroy);

routes.post('/employee', employeeController.create);
routes.get('/employees', employeeController.list);
routes.get('/employee/:id', employeeController.index);
routes.put('/employee/:id', employeeController.update);
routes.delete('/employee/:id', employeeController.destroy);

module.exports = routes;
