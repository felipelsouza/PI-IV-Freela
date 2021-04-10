const express = require('express');

const employerController = require('./controllers/EmployerController');
const employeeController = require('./controllers/EmployeeController');
const jobController = require('./controllers/JobController');

const routes = express.Router();

routes.post('/employers', employerController.create);
routes.get('/employers', employerController.list);
routes.get('/employers/:id', employerController.index);
routes.put('/employers/:id', employerController.update);
routes.delete('/employers/:id', employerController.destroy);

routes.post('/employees', employeeController.create);
routes.get('/employees', employeeController.list);
routes.get('/employees/:id', employeeController.index);
routes.put('/employees/:id', employeeController.update);
routes.delete('/employees/:id', employeeController.destroy);

routes.post('/employers/:employer_id/jobs', jobController.create);

module.exports = routes;
