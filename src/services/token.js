const jwt = require('jsonwebtoken');
require('dotenv').config();

const sign = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
  return token;
};

const verify = (token) => {
  const authorization = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return false;

    return decoded;
  });

  return authorization;
};

module.exports = { sign, verify };
