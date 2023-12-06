const rateLimit = require('express-rate-limit');

const limitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  limitter,
};
