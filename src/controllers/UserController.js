const User = require('../models/User');

const index = async (req, res) => {
  const user = await User.findAll();

  console.log('cu');
  console.log(user);

  if (!user) {
    return res.status(400).json({ error: 'Não foram encontrados usuários' });
  }

  return res.json(user);
};

module.exports = { index }