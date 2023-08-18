const adminRouter = require('express').Router();

const { ExtraOptions, DisabledDates, News, DateType } = require('../db/models/');

const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/dates');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });


  adminRouter.post('/', upload.single('datesPic'), async(req, res) => {
    try {
        const {title, description, price} = req.body
        const photoFileName = req.file ? req.file.filename : null;
        const newDate = await DateType.create({title: title, description: description, img: `/uploads/dates/${photoFileName}`, price: price })
        res.json(newDate)
    } catch (error) {
        console.log('Еррор', error);
    }
})

adminRouter.delete('/deleteDate', async (req,res) => {
  try {
    const {id} = req.body
    await DateType.destroy({where: {id}})
    res.sendStatus(200)
  } catch (error) {
    console.log('error', error)
  }
})

adminRouter.delete('/deleteExtra', async (req,res) => {
  try {
    const {id} = req.body
    await ExtraOptions.destroy({where: {id}})
    res.sendStatus(200)
  } catch (error) {
    console.log('error', error)
  }
})



module.exports = adminRouter