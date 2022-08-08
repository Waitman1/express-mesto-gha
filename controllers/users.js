const User = require('../models/user');
const NotFound = require('../errors/errors');
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  CREATED_CODE,
  INTERNAL_SERVER_ERROR,
} = require('../errors/ErrorStatus');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound();
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь по указанному _id не найден.',
        });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({
          message: 'Пользователь по указанному _id не найден.',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATED_CODE).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при создании пользователя. ',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound();
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при обновлении пользователя. ',
        });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь по указанному _id не найден.',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound();
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({
          message: 'Переданы некорректные данные при обновлении аватара. ',
        });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({
          message: 'Пользователь по указанному _id не найден.',
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
