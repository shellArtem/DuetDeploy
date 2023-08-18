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

  // const cpUpload = upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'photo2', maxCount: 1 }])

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
    console.log(photoFileName);
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
    // console.log('11111111111111111111', user)
    const anketa = await Anketa.findOne({where: {user_id: user.id}})
    // console.log('22222222222222222222222', anketa)
    const wish = await Wish.findOne({where:{user_id: user.id}})
    // console.log('33333333333333333333333', wish)
    // const parametr1 = wish.Автомобиль
    // const parametr2 = wish.Рост
    // const parametr3 = wish.Образование
    // const parametr4 = wish.Наличие_детей
    // const parametr5 = wish.Наличие_опыта_супружеской_жизни
    // const parametr6 = wish.Важно_ли_Вам_чтобы_партнёр_занимался_спортом
    // const parametr7 = (wish.Возраст.split(',').map((el) => Number(el)))

    // console.log('1111111111111111111', parametr7)

    if(anketa.Пол === "Мужчина" ) {
      const matches = await Anketa.findAll({where: {Пол: "Женщина"}, include: User})
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

    // res.json(result)

  })


module.exports = router


// 'Фамилия': 'Мышь',
//     'Имя': 'Елена',
//     'Отчество': null,
//     'Контактный_телефон': '+72222222222',
//     'еmail': null,
//     'Дата_рождения': '09.08.2015',
//     'Полных_лет': '8',
//     'Знак_Зодиака': null,
//     'Национальность': null,
//     'Пол': 'Женщина',
//     'Рост': '150_160',
//     'Вес': null,
//     'Телосложение': null,
//     'Цвет_глаз': null,
//     'Цвет_волос': null,
//     'Длина_волос': null,
//     'Общее_состояние_здоровья': null,
//     'Вредные_привычки': null,
//     'Место_жительства': null,
//     'Жилищные_условия': null,
//     'С_кем_проживаете': null,
//     'Материальное_положение': null,
//     'Наличие_автомобиля': 'нет',
//     'Водительское_удостоверение': null,
//     'Образование': 'неполное высшее',
//     'Специальность': null,
//     'Знание_иностранных_языков': 'да',
//     'Должность': null,
//     'Семейное_положение': 'не_замужем',
//     'Ранее_были_замужем_или_женаты': null,
//     'Наличие_детей': 'да',
//     'Пол_детей': null,
//     'Возраст_детей': null,
//     'Опишите_кратко_свой_характер': null,
//     'Готовы_ли_вы_к_переменам': null,
//     'Какие_качества_вы_цените_в_людях': null,
//     'Любите_ли_вы_делать_сюрпризы': null,
//     'Ваши_достоинства_и_недостатки': 'не кусаюсь',
//     'Семейнобытовые_обязанности': null,
//     'Предпочтения_в_еде': null,
//     'Умеете_и_любите_ли_вы_готовить': 'да',
//     'Увлечения_хобби': null,
//     'Вы_романтик': null,
//     'Занимаетесь_ли_вы_спортом': null,



// 'Возраст': null,



//     'Наличие_вредных_привычек': null,
//     'Совместное_проживание': null,
//     'Материальное_положение_партнера': null,



//     'Желаемая_сфера_деятельности': null,
//     'Знание_иностранных_языков': null,

//     'Пожелания_к_характеру': null,
//     'Семейнобытовые_обязанности': null,
//     'Увлечения_хобби': null,
//     'Дополнительные_пожелания': null,