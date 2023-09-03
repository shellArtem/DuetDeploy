const router = require('express').Router();
const multer = require('multer')
const { User, Anketa, Wish, Event } = require('../db/models');

router.get('/', (req, res) => {
    try {
        res.json(req.session?.login || '');
      } catch (e) {
      }
})

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/user');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage });

  router.put('/', upload.single('photo'), async(req, res) => {
    const photoFileName = req.file ? req.file.filename : null;
    try {
        const user = await User.findOne({where: {phone: req.session.phone}})
        user.photo = `/uploads/user/${photoFileName}`
        user.save()
        req.session.save(() => {
            res.json(user.photo)
          });
    } catch (error) {
        console.log(error);
    }

  })
  router.put('/2', upload.single('photo2'), async(req, res) => {
    const photoFileName = req.file ? req.file.filename : null;
    try {
        const user = await User.findOne({where: {phone: req.session.phone}})
        user.photo2 = `/uploads/user/${photoFileName}`
        user.save()
        req.session.save(() => {
            res.json(user.photo)
          });
    } catch (error) {
        console.log(error);
    }
  })


  router.post('/matches', async (req, res) => {
    const {phone} = req.body
    const userPhone = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`
    const user = await User.findOne({where: {phone: userPhone}})
    const anketa = await Anketa.findOne({where: {user_id: user.id}})
    const wish = await Wish.findOne({where:{user_id: user.id}})
    const parametr1 = wish.Автомобиль
    const parametr2 = wish.Рост
    const parametr3 = wish.Образование
    const parametr4 = wish.Наличие_детей
    const parametr5 = wish.Наличие_опыта_супружеской_жизни
    const parametr6 = wish.Важно_ли_Вам_чтобы_партнёр_занимался_спортом
    const parametr7 = (wish.Возраст.split(',').map((el) => Number(el)))

    if(anketa.Пол === "Мужчина" ) {
      const matches = await Anketa.findAll({where: {Пол: "Женщина"}, include: User})
      const result = matches.filter((el) => el.Полных_лет > parametr7[0] && parametr7[1] > el.Полных_лет )
      const result2 = result.filter((el) => parametr2.includes(el.Рост)) 
      const result3 = result2.filter((el) => parametr3.includes(el.Образование))
      const result4 = result3.filter((el) => 
      parametr6 === 'нет' ? el.Занимаетесь_ли_вы_спортом === 'да' || el.Занимаетесь_ли_вы_спортом === 'нет' 
      :
      el.Занимаетесь_ли_вы_спортом === 'да')
      const result5 = result4.filter((el) => 
      parametr4 === 'не имеет значения' ? el.Наличие_детей === 'да' || el.Наличие_детей === 'нет' 
      :
      parametr4 === "да" ? el.Наличие_детей === "да" 
      : 
      el.Наличие_детей === 'нет' )
      const result6 = result5.filter((el) => el.Наличие_автомобиля === parametr1 )
      res.json(matches)

    } else if (anketa.Пол === "Женщина") {
      const matches = await Anketa.findAll({where: {Пол: "Мужчина"}, include: User})
      const result = matches.filter((el) => el.Полных_лет > parametr7[0] && parametr7[1] > el.Полных_лет )
      const result2 = result.filter((el) => parametr2.includes(el.Рост)) 
      const result3 = result2.filter((el) => parametr3.includes(el.Образование))
      const result4 = result3.filter((el) => 
      parametr6 === 'нет' ? el.Занимаетесь_ли_вы_спортом === 'да' || el.Занимаетесь_ли_вы_спортом === 'нет' 
      :
      el.Занимаетесь_ли_вы_спортом === 'да')
      const result5 = result4.filter((el) => 
      parametr4 === 'не имеет значения' ? el.Наличие_детей === 'да' || el.Наличие_детей === 'нет' 
      :
      parametr4 === "да" ? el.Наличие_детей === "да" 
      : 
      el.Наличие_детей === 'нет' )
      const result6 = result5.filter((el) => el.Наличие_автомобиля === parametr1 )
   
      // parametr5 === 'да' ? el.Семейное_положение === 'женат' || el.Семейное_положение === 'вдовец' || el.Семейное_положение === 'разведён' 
      // : parametr5 === "не имеет значения" ? el.Семейное_положение === 'женат' || el.Семейное_положение === 'вдовец' || el.Семейное_положение === 'разведён' || el.Семейное_положение === 'холост'  
      // : el.Семейное_положение === 'холост' 
   
      res.json(result6)
    } 
  })


module.exports = router