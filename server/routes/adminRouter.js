const adminRouter = require('express').Router();
const { Op } = require('sequelize');
const { ExtraOptions, DisabledDates, News, Event, DateType } = require('../db/models/');

const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/news');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

adminRouter.post('/extra', async(req,res) => {
const {title, description, price} = req.body
try {
    const newExtraOption = await ExtraOptions.create({title:title, amount:0, price:price })
    res.json(newExtraOption)
} catch (error) {
    console.log('newExtraOption was not created', error)
}
})

adminRouter.get('/allEvents', async(req,res) => {
    try {
        const allEvents = await Event.findAll()
        res.json(allEvents)
    } catch (error) {
        console.log('error', error)
    }
})

adminRouter.delete('/allEvents', async(req,res) => {
    const {id} = req.body
    const event = await Event.findOne({where:{id}})
    const newDisabledDate = await DisabledDates.findOne({where:{disabledDate : event.selectedDate}})
    await DisabledDates.destroy({where:{disabledDate : event.selectedDate}})
    await Event.destroy({where: {id}})
    res.json(newDisabledDate)
})

adminRouter.get('/extra', async(req,res) => {
    const extraOptions = await ExtraOptions.findAll()
    res.json(extraOptions)
})

adminRouter.get('/news', async(req, res) => {
    try {
        const news = await News.findOne({where: {id: 1}})
        res.json(news)
    } catch (error) {
        console.log('Не получилось загрузить новость', error);
    }
})

adminRouter.put('/news', upload.single('newsPic'), async(req, res) => {
    try {
    const {newsBody} = req.body
    const photoFileName = req.file ? req.file.filename : null;
    const news = await News.findOne({where: {id: 1}})
    news.body = newsBody
    news.pic = `/uploads/news/${photoFileName}`
    news.save()
    req.session.save(() => {
        res.json(news)
      });
} catch (error) {
    console.log('Не получилось загрузить новость', error);
}
})

adminRouter.post('/disabledDate', async(req,res) => {
    const {date, isAdmin} = req.body
    const disabledDate = await DisabledDates.findOne({where:{disabledDate:date}})
    if (isAdmin && !disabledDate) {
        const newDisabledDate = await DisabledDates.create({disabledDate:date, isAdmin: true})
        res.json(newDisabledDate)
    } else if (!isAdmin && !disabledDate) {
        const newDisabledDate = await DisabledDates.create({disabledDate:date})
        res.json(newDisabledDate)
    } else {
       res.sendStatus(200)
    }
    })


adminRouter.get('/disabledDate', async(req,res) => {
const disabledDates = await DisabledDates.findAll({order: [["disabledDate", "ASC"]]})
res.json(disabledDates)
})

adminRouter.delete('/disabledDate', async(req,res) => {
    const {id} = req.body
    await DisabledDates.destroy({where:{id}})
    res.sendStatus(200)
})


module.exports = adminRouter;