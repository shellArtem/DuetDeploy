const express = require('express');
const bcrypt = require('bcrypt');

const regRouter = express.Router();

const { User } = require('../db/models');

regRouter.post('/', async (req, res) => {
  const { name, phone, password, remember } = req.body;
  try {
    const userPhone = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`
    const hash = await bcrypt.hash(password, 10);
    const user = await User.findOne({ where: { phone:userPhone } });
    if (user || name === 'admin') {
      res.json({ err: 'Такой пользователь уже существует' });
    } else {
      const newUser = await User.create({ name, phone: userPhone, password: hash });
      req.session.login = newUser.name;
      req.session.phone = newUser.phone;
      req.session.save(() => {
        res.json({ msg: 'Пользователь зарегистрирован', name:newUser.name, phone: newUser.phone  });
      });
    }
  } catch (error) {
    console.log('owibka', error);
  }
});

module.exports = regRouter;
