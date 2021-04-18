const Employer = require('../models/Employer');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const { name, email, password, cellphone, company, role } = req.body;

  try {
    if (!name || !email || !password || !cellphone || !company || !role) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      cellphone.trim().length === 0 ||
      password.trim().length === 0 ||
      company.trim().length === 0 ||
      role.trim().length === 0
    ) {
      return res.status(400).json({ message: 'Preencha todos os campos!' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Senha deve ter 8 ou mais caracteres!' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'E-mail inválido!' });
    }

    const hasEmail = await Employer.findOne({ where: { email: email.toLowerCase() } });

    if (hasEmail) {
      return res.status(401).json({ message: 'E-mail já está cadastrado!' });
    }

    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    const employer = await Employer.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      cellphone,
      company,
      role,
    });

    employer.password = undefined;

    return res.status(201).json({
      message: 'Empregador registrado com sucesso!',
      employer,
    });
  } catch (err) {
    res.status(400).json({ message: 'Erro no registro de Empregador', err });
  }
};

const list = async (req, res) => {
  try {
    const employers = await Employer.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'cellphone',
        'company',
        'role',
        'created_at',
        'updated_at',
      ],
    });

    return res.status(200).json(employers);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível listar os empregadores' });
  }
};

const index = async (req, res) => {
  const { id } = req.params;

  try {
    const employer = await Employer.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'cellphone',
        'company',
        'role',
        'created_at',
        'updated_at',
      ],
    });

    return res.status(200).json(employer);
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível encontrar o Empregador' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, cellphone, company, role } = req.body;

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
    if (!company || company.trim().length === 0) {
      return res.status(400).json({ message: 'Empresa não pode ser vazia!' });
    }
    if (!role || role.trim().length === 0) {
      return res.status(400).json({ message: 'Cargo não pode ser vazio!' });
    }

    const employer = await Employer.findByPk(id, {
      attributes: [
        'id',
        'name',
        'email',
        'cellphone',
        'company',
        'role',
        'created_at',
        'updated_at',
      ],
    })
      .then((user) => user.update({ name, email, cellphone, company, role }))
      .catch((err) => res.status(500).json(err));

    return res.status(200).json({ message: 'Dados atualizados', employer });
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível atualizar os dados', err });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    await Employer.findByPk(id)
      .then((employer) => employer.destroy())
      .catch((err) => res.status(500).json(err));

    return res.status(200).json({ message: 'Empregador deletado' });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Não foi possível deletar o Empregador', err });
  }
};

module.exports = { create, list, index, update, destroy };
