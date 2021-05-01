const Job = require('../models/Job');
const Employer = require('../models/Employer');
const Employee = require('../models/Employee');
const { Op } = require('sequelize');
const { sequelize } = require('../models/Job');
const { QueryTypes } = require('sequelize');

const create = async (req, res) => {
  const { name, description, salary, dev_type, technologies } = req.body;
  const { employer_id } = req.params;

  try {
    const employer = await Employer.findByPk(employer_id);

    if (!employer) {
      return res
        .status(400)
        .json({ message: `Não existe empregador com esse id: ${employer_id}` });
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

    if (!technologies) {
      return res.status(400).json({ message: 'Selecione as tecnologias' });
    }

    const job = await Job.create({
      employer_id,
      name,
      description,
      salary: parseInt(salary),
      dev_type,
      technologies: JSON.stringify(technologies),
    });

    return res.status(201).json({ message: 'Vaga criada com sucesso', job });
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível registrar a vaga', err });
  }
};

const listAll = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          association: 'employers',
          attributes: ['id', 'name', 'email', 'cellphone', 'company', 'role'],
        },
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'cellphone', 'dev_type'],
        },
      ],
    });

    if (!jobs) {
      return res.status(204).json({ message: 'Não existem vagas disponíveis' });
    }

    return res.status(200).json(jobs);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Não foi possível listar as vagas de emprego' });
  }
};

const listById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobs = await Job.findByPk(id, {
      include: [
        {
          association: 'employers',
          attributes: ['id', 'name', 'email', 'cellphone', 'company', 'role'],
        },
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'cellphone', 'dev_type'],
        },
      ],
    });

    if (!jobs) {
      return res.status(204).json({ message: 'Não existem vagas disponíveis' });
    }

    return res.status(200).json(jobs);
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Não foi possível listar as vagas de emprego' });
  }
};

const listByType = async (req, res) => {
  const { dev_type, technologies } = req.body;

  try {
    const devTypes = ['frontend', 'backend', 'fullstack'];
    if (!devTypes.includes(dev_type)) {
      return res.status(400).json({ message: 'Tipo de desenvolvedor inválido' });
    }

    const jobs = await Job.findAll({
      where: {
        [Op.or]: {
          dev_type,
          [Op.or]: technologies.map((tech) => {
            return { technologies: { [Op.like]: `%${tech.name}%` } };
          }),
        },
      },
      include: [
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'cellphone', 'dev_type'],
        },
        {
          association: 'employers',
          attributes: ['id', 'name', 'email', 'cellphone', 'company', 'role'],
        },
      ],
    });

    if (!jobs) {
      return res
        .status(204)
        .json({ message: 'Não existem vagas disponíveis para o tipo de desenvolvedor' });
    }

    res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar as vagas', err });
  }
};

const listByEmployer = async (req, res) => {
  const { employer_id } = req.params;

  try {
    const jobs = await Job.findAll({
      where: { employer_id },
      include: [
        {
          association: 'employers',
          attributes: ['id', 'name', 'email', 'cellphone', 'company', 'role'],
          where: { id: employer_id },
        },
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'cellphone', 'dev_type'],
        },
      ],
    });

    if (!jobs) {
      return res
        .status(204)
        .json({ message: 'Não existem vagas disponíveis deste Contratante' });
    }

    res.status(201).json(jobs);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar as vagas', err });
  }
};

const listByEmployee = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const jobs = await Job.findAll({
      where: { employee_id },
      include: [
        {
          association: 'employees',
          attributes: ['id', 'name', 'email', 'cellphone', 'dev_type'],
          where: { id: employee_id },
        },
        {
          association: 'employers',
          attributes: ['id', 'name', 'email', 'cellphone', 'company', 'role'],
        },
      ],
    });

    if (!jobs) {
      return res.status(204).json({ message: 'Não existem vagas relacionadas' });
    }

    res.status(201).json(jobs);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar as vagas', err });
  }
};

const updateEmployee = async (req, res) => {
  const { job_id } = req.params;
  const { employee_id } = req.body;

  try {
    const job = await Job.findByPk(job_id);
    const employee = await Employee.findByPk(employee_id);

    if (!job) {
      return res.status(404).json({ message: 'Vaga inexistente' });
    }
    if (!employee) {
      return res.status(404).json({ message: 'Empregado inexistente' });
    }

    const updatedJob = await job.update({ employee_id });

    return res.status(200).json({ message: 'Vaga atualizada com sucesso!', updatedJob });
  } catch (err) {
    return res.status(500).json({ message: '', err });
  }
};

const destroy = async (req, res) => {
  const {} = req.params;

  try {
  } catch (err) {
    return res.status(500).json({ message: '', err });
  }
};

module.exports = {
  create,
  listAll,
  listById,
  listByType,
  listByEmployer,
  listByEmployee,
  updateEmployee,
};
