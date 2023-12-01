const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;

const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, NODE_ENV ? JWT_SECRET : 'dev_secret', {
    expiresIn: '7d',
  });

  return token;
};

module.exports = generateJwtToken;
