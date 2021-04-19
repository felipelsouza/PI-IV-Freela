const express = require('express');

const employerController = require('./controllers/EmployerController');
const employeeController = require('./controllers/EmployeeController');
const jobController = require('./controllers/JobController');
const authController = require('./controllers/AuthController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/employers/auth', authController.employerLogin);
routes.post('/employees/auth', authController.employeeLogin);

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

routes.post('/employers/:employer_id/jobs', authMiddleware, jobController.create);
routes.get('/jobs', authMiddleware, jobController.listAll);
routes.get('/jobs/dev-type/:dev_type', authMiddleware, jobController.listByType);

module.exports = routes;
