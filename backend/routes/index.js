const routes = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  loginValidation,
  createUserValidation,
} = require('../middlewares/validation');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
routes.post('/signin', loginValidation, login);
routes.post('/signup', createUserValidation, createUser);

routes.use(auth);

routes.delete('/signout', (req, res) => res.clearCookie('jwt').send({ message: 'Выход' }));
routes.use('/users', userRouter);
routes.use('/cards', cardRouter);
routes.use('/*', (req, res, next) => next(new NotFoundError('Мы не обрабатываем данный роут')));

module.exports = routes;
