const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const { NOT_FOUND_CODE } = require('./errors/ErrorStatus');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62f0d19a64182eaa22f9eb79',
  };
  next();
});

app.use('/', users);
app.use('/', cardRouter);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT, () => {

});
