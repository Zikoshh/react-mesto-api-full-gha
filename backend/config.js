const rateLimit = require('express-rate-limit');

const limitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const corsConfig = {
  origin: [
    'http://localhost:5173',
    'https://zikoshh.students.nomoredomainsmonster.ru',
  ],
  credentials: true,
};

module.exports = {
  limitter,
  corsConfig,
};
