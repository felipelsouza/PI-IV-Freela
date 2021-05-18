const express = require('express');

const employerController = require('./controllers/EmployerController');
const employeeController = require('./controllers/EmployeeController');
const jobController = require('./controllers/JobController');
const authController = require('./controllers/AuthController');
const technologyController = require('./controllers/TechnologyController');
const matchController = require('./controllers/MatchController');

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
routes.post('/jobs/employees/techs', authMiddleware, jobController.listByType);
routes.get('/jobs', authMiddleware, jobController.listAll);
routes.get('/jobs/:id', authMiddleware, jobController.listById);
routes.get('/jobs/employers/:employer_id', authMiddleware, jobController.listByEmployer);
routes.get('/jobs/employees/:employee_id', authMiddleware, jobController.listByEmployee);
routes.put('/jobs/:job_id/update', authMiddleware, jobController.updateJob);
routes.delete('/jobs/:id', authMiddleware, jobController.destroy);

routes.post('/technologies', technologyController.create);

routes.post('/jobs/:job_id/matches', authMiddleware, matchController.create);
routes.get('/employers/:employer_id/jobs/matches', authMiddleware, matchController.list);
routes.get(
  '/employers/:employer_id/jobs/:job_id/matches',
  authMiddleware,
  matchController.listByJobId
);
routes.get(
  '/employees/:employee_id/matches/',
  authMiddleware,
  matchController.listByEmployee
);
routes.get('/jobs/:job_id/matches/:match_id', authMiddleware, matchController.index);
routes.patch('/jobs/:job_id/matches/:match_id', authMiddleware, matchController.patch);

module.exports = routes;
