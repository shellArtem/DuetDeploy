const express = require('express');
const bcrypt = require('bcrypt');

const loginRouter = express.Router();


const { User } = require('../db/models');


loginRouter.post('/', async (req, res) => {
  // const { name, phone, password, remember } = req.body;
  const { phone, password, remember } = req.body;
  const userPhone = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`
  try {
    const user = await User.findOne({ where: { phone:userPhone } });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.login = user.name;
        req.session.phone = user.phone;
        req.session.save(() => {
          // res.json({ msg: 'Вы успешно авторизованы!', name:user.name, auth:true, img: user.photo, phone: user.phone });
          res.json({ msg: 'Вы успешно авторизованы!', auth:true, img: user.photo, phone: user.phone });
        });
      } else {
        res.json({ err: 'Пароль неверный' });
      }
    } else {
      res.json({ err: 'Такой пользователь не найден' });
    }
  } catch (error) {
    res.send('Чтото пошло не так', error);
  }
});




module.exports = loginRouter;
