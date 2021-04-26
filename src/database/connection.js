const Sequelize = require('sequelize');
const dbConfig = require('../config');

const Employer = require('../models/Employer');
const Employee = require('../models/Employee');
const Job = require('../models/Job');
const Technology = require('../models/Technology');

const connection = new Sequelize(dbConfig);

Employer.init(connection);
Employee.init(connection);
Job.init(connection);
Technology.init(connection);

Employer.associate(connection.models);
Employee.associate(connection.models);
Job.associate(connection.models);

module.exports = connection;
