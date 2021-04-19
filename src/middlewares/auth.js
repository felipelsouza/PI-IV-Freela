const { verify } = require('../services/token');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token inválido!' });
  }

  const parts = authHeader.split(' ');
  if (!parts.length === 2) {
    return res.status(401).json({ message: 'Token inválido!' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token inválido!' });
  }

  const authorization = verify(token);

  if (!authorization) {
    return res.status(401).json({ message: 'Token inválido!' });
  }

  return next();
};
