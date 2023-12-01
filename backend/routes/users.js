const userRouter = require('express').Router();
const {
  getUserByIdValidation,
  updateInfoValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');
const {
  getUsers,
  getUserById,
  getUserByJwt,
  updateInfo,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserByJwt);
userRouter.get('/:userId', getUserByIdValidation, getUserById);
userRouter.patch('/me', updateInfoValidation, updateInfo);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;
