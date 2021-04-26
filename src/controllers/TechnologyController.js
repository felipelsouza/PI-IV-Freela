const Technology = require('../models/Technology');

const create = async (req, res) => {
  const { techsArray } = req.body;

  try {
    await techsArray.map(async (tech) => {
      await Technology.create({ name: tech.name });
    });

    const allTechs = await Technology.findAll();

    return res
      .status(201)
      .json({ message: 'Tecnologias adicionadas com sucesso!', allTechs });
  } catch (err) {
    return res.status(500).json({ message: 'Não foi possível registrar a vaga', err });
  }
};

module.exports = { create };
