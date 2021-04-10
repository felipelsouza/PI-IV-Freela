const Job = require('../models/Job');
const Employer = require('../models/Employer');
const Employee = require('../models/Employee');

const create = async (req, res) => {
  const { name, description, salary, dev_type } = req.body;
  const { employer_id } = req.params;

  try {
    const employer = await Employer.findByPk(employer_id);
    
    if (!employer) {
      return res.status(400).json({ message: `Não existe empregador com esse id: ${employer_id}` });
    }

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Digite um nome válido' });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: 'Digite uma descrição válida' });
    }

    if (!salary) {
      return res.status(400).json({ message: 'Digite um salário válido' });
    }

    if (!dev_type) {
      return res.status(400).json({ message: 'Forneça um tipo de desenvolvedor' });
    }

    const devTypes = ['frontend', 'backend', 'fullstack'];
    if (!devTypes.includes(dev_type)) {
      return res.status(400).json({ message: 'Tipo de desenvolvedor inválido' });
    }

    const job = await Job.create({employer_id, name, description, salary:parseInt(salary), dev_type});
    console.log(job)
    return res.status(201).json({message: 'Vaga criada com sucesso', job});

  } catch (err) {
    return res.status(400).json({ message: 'Não foi possível registrar a vaga', err});
  }
};

const index = async (req, res) => {
  const { } = req.params;

  try {


  } catch (err) {
    return res.status(400).json({ message: '' });
  }
};

const update = async (req, res) => {
  const { } = req.params;
  const { } = req.body;

  try {


  } catch (err) {
    return res.status(400).json({ message: '', err });
  }
};

const destroy = async (req, res) => {
  const { } = req.params;

  try {

  } catch (err) {
    return res.status(400).json({ message: '', err });
  }
};

module.exports = { create, index, update, destroy };
