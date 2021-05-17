const Match = require('../models/Match');
const Job = require('../models/Job');
const Employer = require('../models/Employer');
const Employee = require('../models/Employee');

const create = async (req, res) => {
  const { job_id } = req.params;
  const { employee_id } = req.body;

  try {
    const job = await Job.findByPk(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Vaga inexistente!' });
    }

    const match = await Match.create({
      employer_id: job.employer_id,
      job_id: job.id,
      employee_id,
      status: null,
    });

    return res
      .status(201)
      .json({ message: 'Candidatura para a vaga realizada com sucesso!', match });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Não foi possível se candidatar para a vaga!' });
  }
};

const list = async (req, res) => {
  const { employer_id } = req.params;

  try {
    const matches = await Match.findAll({ where: { employer_id } });
    if (!matches) {
      return res.status(204).json({ message: 'Não existem Matches para suas vagas' });
    }

    return res.status(200).json(matches);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar os Matches' });
  }
};

const listByJobId = async (req, res) => {
  const { employer_id, job_id } = req.params;

  try {
    const matches = await Match.findAll({
      where: { employer_id, job_id },
      include: {
        association: 'employee',
        attributes: ['id', 'name', 'email', 'cellphone', 'dev_type', 'formation'],
      },
    });
    if (matches.length === 0) {
      return res.status(204).json({ message: 'Não existem Matches para esta vagas' });
    }

    return res.status(200).json(matches);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar os Matches' });
  }
};

const index = async (req, res) => {
  const { match_id, job_id } = req.params;

  try {
    const match = await Match.findByPk(match_id, {
      include: { association: 'job', where: { id: job_id } },
    });
    if (!match) {
      return res.status(404).json({ message: 'Vaga inexistente' });
    }

    return res.status(200).json(match);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar o Match' });
  }
};

const patch = async (req, res) => {
  const { match_id } = req.params;

  try {
    const match = await Match.findByPk(match_id);
    if (!match) {
      return res.status(404).json({ message: 'Candidatura inexistente para a Vaga!' });
    }

    let matchUpdated;
    let jobUpdated;
    if (!match.status) {
      matchUpdated = await match.update({ status: 'OK' });
      [jobUpdated] = await Job.update(
        { employee_id: match.employee_id },
        { where: { id: match.job_id } }
      );

      return res
        .status(200)
        .json({ message: 'Match realizado com sucesso!', matchUpdated });
    } else {
      matchUpdated = await match.update({ status: null });
      [jobUpdated] = await Job.update(
        { employee_id: null },
        { where: { id: match.job_id } }
      );

      return res
        .status(200)
        .json({ message: 'Match removido com sucesso!', matchUpdated });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível finalizar o Match!' });
  }
};

module.exports = { create, list, index, patch, listByJobId };
