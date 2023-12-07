const { ValidationError, CastError } = require('mongoose').Error;
const bcrypt = require('bcrypt');
const User = require('../models/users');
const generateJwtToken = require('../utils/auth');
const BadRequestError = require('../errors/BadRequestError');
const DuplicateError = require('../errors/DuplicateError');
const NotFoundError = require('../errors/NotFoundError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

const HTTP_SUCCES_CREATED_CODE = 201;
const SOLT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '_id name about avatar email');
    return res.send(users);
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.userId,
      '_id name about avatar email',
    ).orFail(() => next(new NotFoundError('Пользователь с указанным id не найден')));

    return res.send(user);
  } catch (err) {
    if (err instanceof CastError) {
      return next(new BadRequestError('Передан невалидный id'));
    }

    return next(err);
  }
};

const getUserByJwt = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.user._id,
      '_id name about avatar email',
    ).orFail(() => next(new NotFoundError('Пользователя нету в базе данных')));

    res.send(user);
  } catch (err) {
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, SOLT_ROUNDS);
    // eslint-disable-next-line no-unused-vars
    const newUser = await new User({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }).save();
    return res
      .status(HTTP_SUCCES_CREATED_CODE)
      .send({ message: 'Успешно зарегистрировались' });
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new DuplicateError('Такой пользователь уже существует'));
    }

    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email })
      .select('+password')
      .orFail(() => next(new UnAuthorizedError('Неверные email или password')));

    const matched = await bcrypt.compare(
      String(req.body.password),
      userInfo.password,
    );

    if (!matched) {
      return next(new UnAuthorizedError('Неверные email или password'));
    }

    const token = generateJwtToken({
      _id: userInfo._id,
    });

    res.send({ jwt: token });
  } catch (err) {
    return next(err);
  }
};

const updateInfo = async (req, res, next) => {
  try {
    const newUserData = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      select: '_id name about avatar email',
    }).orFail(() => next(new NotFoundError('Пользователь с указанным id не найден')));

    return res.send(newUserData);
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequestError(err.message));
    }

    return next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const newUserData = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      select: '_id name about avatar email',
    }).orFail(() => next(new NotFoundError('Пользователь с указанным id не найден')));

    return res.send(newUserData);
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequestError(err.message));
    }

    return next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getUserByJwt,
  createUser,
  login,
  updateInfo,
  updateAvatar,
};
