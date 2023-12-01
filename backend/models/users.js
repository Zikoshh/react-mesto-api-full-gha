const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (avatar) => validator.isURL(avatar),
        message: (props) => `${props.value} неверный формат ссылки`,
      },
    },
    email: {
      type: String,
      required: {
        value: true,
        message: 'Поле email является обязательным',
      },
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: (props) => `${props.value} это не валидный email`,
      },
    },
    password: {
      type: String,
      required: {
        value: true,
        message: 'Поле password является обязательным',
      },
      select: false,
    },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model('user', userSchema);
