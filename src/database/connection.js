const Sequelize = require('sequelize');
const dbConfig = require('../config');

const Employer = require('../models/Employer');
const Employee = require('../models/Employee');

const connection = new Sequelize(dbConfig);

Employer.init(connection);
Employee.init(connection);

module.exports = connection;
