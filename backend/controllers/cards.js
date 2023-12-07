const { ValidationError, CastError } = require('mongoose').Error;
const Card = require('../models/cards');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const InsufficientPermissionsError = require('../errors/InsufficientPermissionsError');

const { HTTP_SUCCES_CREATED_CODE = 201 } = process.env;

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}, '_id name link owner likes');
    return res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await new Card({ name, link, owner: req.user._id }).save();

    return res.status(HTTP_SUCCES_CREATED_CODE).send({
      _id: newCard._id,
      name: newCard.name,
      link: newCard.link,
      owner: newCard.owner,
      likes: newCard.likes,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};

const deleteCardById = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId).orFail(() => next(new NotFoundError('Карточка с указанным id не найдена')));

    if (card.owner.toString() !== req.user._id) {
      return next(
        new InsufficientPermissionsError(
          'Недостаточно прав для удаления чужой карточки',
        ),
      );
    }

    await Card.findByIdAndDelete(req.params.cardId).orFail(() => next(new NotFoundError('Карточка с указанным id не найдена')));

    return res.send({ message: 'Карточка удалена' });
  } catch (err) {
    if (err instanceof CastError) {
      return next(new BadRequestError('Передано невалидное id карточки'));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const newCardData = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true, select: '_id name link owner likes' },
    ).orFail(() => next(new NotFoundError('Передан несуществующий id карточки')));

    return res.send(newCardData);
  } catch (err) {
    if (err instanceof CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }

    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const newCardData = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true, select: '_id name link owner likes' },
    ).orFail(() => next(new NotFoundError('Передан несуществующий id карточки')));

    return res.send(newCardData);
  } catch (err) {
    if (err instanceof CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }

    return next(err);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
