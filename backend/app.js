const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const routes = require('./routes');
const { limitter } = require('./config');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(helmet());
app.use(limitter);
app.use(cookieParser());

app.use(routes);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
