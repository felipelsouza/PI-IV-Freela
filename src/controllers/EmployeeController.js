const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const { name, email, password, cellphone, formation, dev_type } = req.body;

  try {
    if (!name || !email || !password || !cellphone || !formation || !dev_type) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      cellphone.trim().length === 0 ||
      formation.trim().length === 0 ||
      dev_type.trim().length === 0
    ) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Senha deve ter 8 ou mais caracteres!' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'E-mail inválido!' });
    }

    const hasEmail = await Employee.findOne({ where: { email: email.toLowerCase() } });

    if (hasEmail) {
      return res.status(401).json({ message: 'E-mail já está cadastrado!' });
    }

    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    const devTypes = ['frontend', 'backend', 'fullstack'];
    if (!devTypes.includes(dev_type)) {
      return res.status(400).json({ message: 'Tipo de desenvolvedor inválido' });
    }

    const employee = await Employee.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      cellphone,
      formation,
      dev_type,
    });

    employee.password = undefined;

    return res.status(201).json({
      message: 'Empregado registrado com sucesso!',
      employee,
    });
  } catch (err) {
    res.status(400).json({ message: 'Erro no registro de Empregado', err });
  }
};

const list = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'cellphone',
        'formation',
        'dev_type',
        'created_at',
        'updated_at',
      ],
    });

    return res.status(200).json(employees);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar os empregadores' });
  }
};

const index = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employer.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'cellphone',
        'formation',
        'dev_type',
        'created_at',
        'updated_at',
      ],
    });

    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível encontrar o Empregado' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, cellphone, formation, dev_type } = req.body;

  try {
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Nome não pode ser vazio!' });
    }
    if (!email || email.trim().length === 0) {
      return res.status(400).json({ message: 'Email não pode ser vazio!' });
    }
    if (!cellphone || cellphone.trim().length === 0) {
      return res.status(400).json({ message: 'Telefone não pode ser vazio!' });
    }
    if (!formation || formation.trim().length === 0) {
      return res.status(400).json({ message: 'Formação não pode ser vazia!' });
    }

    if (!dev_type || dev_type.trim().length === 0) {
      return res.status(400).json({ message: 'Formação não pode ser vazia!' });
    }

    const devTypes = ['frontend', 'backend', 'fullstack'];
    if (!devTypes.includes(dev_type)) {
      return res.status(400).json({ message: 'Tipo de desenvolvedor inválido' });
    }

    const employee = await Employee.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'cellphone',
        'formation',
        'dev_type',
        'created_at',
        'updated_at',
      ],
    })
      .then((user) => user.update({ name, email, cellphone, formation, dev_type }))
      .catch((err) => res.status(500).json(err));

    return res.status(200).json({ message: 'Dados atualizados', employee });
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível atualizar os dados', err });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByPk(id)
      .then((employee) => employee.destroy())
      .catch((err) => res.status(500).json(err));

    return res.status(200).json({ message: 'Empregado deletado' });
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível deletar o Empregado', err });
  }
};

module.exports = { create, list, index, update, destroy };
