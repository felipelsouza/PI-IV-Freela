const express = require('express');

const employerController = require('./controllers/EmployerController');
const employeeController = require('./controllers/EmployeeController');
const jobController = require('./controllers/JobController');
const authController = require('./controllers/AuthController');
const technologyController = require('./controllers/TechnologyController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/auth', authController.login);

routes.post('/employers', employerController.create);
routes.get('/employers', authMiddleware, employerController.list);
routes.get('/employers/:id', authMiddleware, employerController.index);
routes.put('/employers/:id', authMiddleware, employerController.update);
routes.delete('/employers/:id', authMiddleware, employerController.destroy);

routes.post('/employees', employeeController.create);
routes.get('/employees', authMiddleware, employeeController.list);
routes.get('/employees/:id', authMiddleware, employeeController.index);
routes.put('/employees/:id', authMiddleware, employeeController.update);
routes.delete('/employees/:id', authMiddleware, employeeController.destroy);

routes.post('/jobs/employers/:employer_id', authMiddleware, jobController.create);
routes.get('/jobs', authMiddleware, jobController.listAll);
routes.get('/jobs/dev-types/:dev_type', authMiddleware, jobController.listByType);
routes.get('/jobs/employers/:employer_id', authMiddleware, jobController.listByEmployer);
routes.get('/jobs/employees/:employee_id', authMiddleware, jobController.listByEmployee);
routes.put('/jobs/:job_id', authMiddleware, jobController.updateEmployee);

routes.post('/technologies', technologyController.create);

module.exports = routes;
