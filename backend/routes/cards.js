const cardRouter = require('express').Router();
const {
  createCardValidation,
  cardIdValidation,
} = require('../middlewares/validation');
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidation, createCard);
cardRouter.delete('/:cardId', cardIdValidation, deleteCardById);
cardRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardRouter;
