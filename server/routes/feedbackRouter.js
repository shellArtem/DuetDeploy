const feedBackRouter = require('express').Router();

const { Feedback } = require('../db/models');

feedBackRouter.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll(
      { where: { approved: false } },
      { raw: true }
    );
    res.json(feedbacks)
  } catch (err) {
    console.error(err);
  }
});

feedBackRouter.get('/feedbackApp', async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll(
      { where: { approved: true } },
      { raw: true }
    );
    res.json(feedbacks)
  } catch (err) {
    console.error(err);
  }
});

feedBackRouter.post('/feedback', async (req, res) => {
  const { name, phone, body } = req.body;
  try {
    const newFeedback = await Feedback.create({
      name,
      phone,
      body,
      approved: false,
    });
    if (newFeedback) {
      res.json({
        msg: 'Ваш отзыв успешно создан! После модерации он отобразится на сайте.',
      });
    } else {
      res.json({ error: 'Что-то пошло не так!' });
    }
  } catch (err) {
    console.error(err);
  }
});

feedBackRouter.put('/feedback', async (req, res) => {
  const {id} = req.body
  try {
    await Feedback.update({approved: true}, {where: {id}})
    res.sendStatus(200)
  } catch (error) {
    console.log('oooops, error', error)
  }

})

feedBackRouter.put('/feedbackAnswer', async (req, res) => {
  const {id, text} = req.body
  try {
    await Feedback.update({answer: text}, {where: {id}})
    res.sendStatus(200)
  } catch (error) {
    console.log('oooops, error', error)
  }

})

feedBackRouter.delete('/feedback', async (req, res) => {
  const {id} = req.body
  try {
    await Feedback.destroy({where: {id}})
    res.sendStatus(200)
  } catch (error) {
    console.log('oooops, error', error)
  }

})

module.exports = feedBackRouter;
