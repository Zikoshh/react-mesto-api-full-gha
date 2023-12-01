const cardRouter = require('express').Router();
const {
  createCardValidation,
  deleteCardByIdValidation,
  likeCardValidation,
  dislikeCardValidation,
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
cardRouter.delete('/:cardId', deleteCardByIdValidation, deleteCardById);
cardRouter.put('/:cardId/likes', likeCardValidation, likeCard);
cardRouter.delete('/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = cardRouter;
