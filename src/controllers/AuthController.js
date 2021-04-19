const Employer = require('../models/Employer');
const Employee = require('../models/Employee');
const token = require('../services/token');
const bcrypt = require('bcrypt');

const employerLogin = async (req, res) => {
  const { email, password } = req.body;

  const employer = await Employer.findOne({ where: { email } });

  if (!employer) {
    return res.status(401).json({ message: 'Email ou senha incorretos!' });
  }

  const isMatch = await bcrypt.compare(password, employer.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Email ou senha incorretos!' });
  }

  const generatedToken = token.sign({ id: employer.id });

  return res.status(200).json({
    message: 'Autenticação efetuada!',
    employerId: employer.id,
    token: generatedToken,
  });
};

const employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  const employee = await Employee.findOne({ where: { email } });

  if (!employee) {
    return res.status(401).json({ message: 'Email ou senha incorretos!' });
  }

  const isMatch = await bcrypt.compare(password, employee.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Email ou senha incorretos!' });
  }

  const generatedToken = token.sign({ id: employee.id });

  return res.status(200).json({
    message: 'Autenticação efetuada!',
    employeeId: employee.id,
    token: generatedToken,
  });
};

module.exports = { employerLogin, employeeLogin };
