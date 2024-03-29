const router = require("express").Router();
const { User, Anketa, Wish, DateType, Event, DateRating } = require("../db/models");
const nodemailer = require("nodemailer");
const fileMiddleweare = require("../middleweare/file");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");
const fs = require("fs").promises;
const path = require("path");

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  // service: 'gmail',
  auth: {
    user: "duet.rybinsk@gmail.com",
    pass: "capqfbairimabaln",
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("Marriage");
    res.sendStatus(200);
  });
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ where: { phone: req.session.phone } });
    res.json({ name: req.session.login, img: user.photo, phone: user.phone });
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/allAnkets", async (req, res) => {
  try {
    const allAnkets = await Anketa.findAll({
      where: {
        createdAt: { [Op.gte]: new Date(Date.now() - 60 * 60 * 24 * 180000) },
      },
    });
    //   await Anketa.destroy({
    //     where: {
    //         createdAt: {[Op.lte]: new Date(Date.now() - (60*60*24*180000))}
    //     }
    // });
    res.json(allAnkets);
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/exportToExcel", async (req, res) => {
  try {
    const allAnkets = await Anketa.findAll();

    // Создаем новую рабочую книгу
    const workbook = new ExcelJS.Workbook();

    // Добавляем новый лист в рабочую книгу
    const worksheet = workbook.addWorksheet("Ankets");

    // Добавляем заголовки столбцов в лист
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Имя", key: "Имя", width: 20 },
      { header: "Фамилия", key: "Фамилия", width: 20 },
      { header: "Отчество", key: "Отчество", width: 20 },
      { header: "Контактный_телефон", key: "Контактный_телефон", width: 20 },
      { header: "еmail", key: "еmail", width: 20 },
      { header: "Дата_рождения", key: "Дата_рождения", width: 20 },
      { header: "Полных_лет", key: "Полных_лет", width: 20 },
      { header: "Знак_Зодиака", key: "Знак_Зодиака", width: 20 },
      { header: "Национальность", key: "Национальность", width: 20 },
      { header: "Пол", key: "Пол", width: 20 },
      { header: "Рост", key: "Рост", width: 20 },
      { header: "Вес", key: "Вес", width: 20 },
      { header: "Телосложение", key: "Телосложение", width: 20 },
      { header: "Цвет_глаз", key: "Цвет_глаз", width: 20 },
      { header: "Цвет_волос", key: "Цвет_волос", width: 20 },
      { header: "Длина_волос", key: "Длина_волос", width: 20 },
      { header: "Общее_состояние_здоровья", key: "Общее_состояние_здоровья", width: 20 },
      { header: "Вредные_привычки", key: "Вредные_привычки", width: 20 },
      { header: "Место_жительства", key: "Место_жительства", width: 20 },
      { header: "Жилищные_условия", key: "Жилищные_условия", width: 20 },
      { header: "С_кем_проживаете", key: "С_кем_проживаете", width: 20 },
      { header: "Материальное_положение", key: "Материальное_положение", width: 20 },
      { header: "Наличие_автомобиля", key: "Наличие_автомобиля", width: 20 },
      { header: "Водительское_удостоверение", key: "Водительское_удостоверение", width: 20 },
      { header: "Образование", key: "Образование", width: 20 },
      { header: "Специальность", key: "Специальность", width: 20 },
      { header: "Знание_иностранных_языков", key: "Знание_иностранных_языков", width: 20 },
      { header: "Сфера_деятельности_в_настоящее_время", key: "Сфера_деятельности_в_настоящее_время", width: 20 },
      { header: "Должность", key: "Должность", width: 20 },
      { header: "Семейное_положение", key: "Семейное_положение", width: 20 },
      { header: "Ранее_были_замужем_или_женаты", key: "Ранее_были_замужем_или_женаты", width: 20 },
      { header: "Наличие_детей", key: "Наличие_детей", width: 20 },
      { header: "Пол_детей", key: "Пол_детей", width: 20 },
      { header: "Возраст_детей", key: "Возраст_детей", width: 20 },
      { header: "Опишите_кратко_свой_характер", key: "Опишите_кратко_свой_характер", width: 20 },
      { header: "Верите_ли_вы_в_любовь_с_первого_взгляда", key: "ПВерите_ли_вы_в_любовь_с_первого_взглядаол", width: 20 },
      { header: "Привлекались_ли_вы_к_уголовной_ответственности", key: "Привлекались_ли_вы_к_уголовной_ответственности", width: 20 },
      { header: "Готовы_ли_вы_к_переменам", key: "Готовы_ли_вы_к_переменам", width: 20 },
      { header: "Какие_качества_вы_цените_в_людях", key: "Какие_качества_вы_цените_в_людях", width: 20 },
      { header: "Любите_ли_вы_делать_сюрпризы", key: "Любите_ли_вы_делать_сюрпризы", width: 20 },
      { header: "Ваши_достоинства_и_недостатки", key: "Ваши_достоинства_и_недостатки", width: 20 },
      { header: "Семейнобытовые_обязанности", key: "Семейнобытовые_обязанности", width: 20 },
      { header: "Предпочтения_в_еде", key: "Предпочтения_в_еде", width: 20 },
      { header: "Умеете_и_любите_ли_вы_готовить", key: "Умеете_и_любите_ли_вы_готовить", width: 20 },
      { header: "Увлечения_хобби", key: "Увлечения_хобби", width: 20 },
      { header: "Вы_романтик", key: "Вы_романтик", width: 20 },
      { header: "Были_ли_в_вашей_жизни_необычные_свидания", key: "Были_ли_в_вашей_жизни_необычные_свидания", width: 20 },
      { header: "Занимаетесь_ли_вы_спортом", key: "Занимаетесь_ли_вы_спортом", width: 20 },
    ];

    // Добавляем данные из каждой анкеты в лист
    allAnkets.forEach((anket) => {
      worksheet.addRow({
        id: anket.id,
        Имя:anket.Имя,
        Фамилия:anket.Фамилия,
        Имя: anket.Имя,
        Отчество: anket.Отчество,
        Контактный_телефон: anket.Контактный_телефон,
        еmail: anket.еmail,
        Дата_рождения: anket.Дата_рождения,
        Полных_лет: anket.Полных_лет,
        Знак_Зодиака: anket.Знак_Зодиака,
        Национальность: anket.Национальность,
        Пол: anket.Пол,
        Рост: anket.Рост,
        Вес: anket.Вес,
        Телосложение: anket.Телосложение,
        Цвет_глаз: anket.Цвет_глаз,
        Цвет_волос: anket.Цвет_волос,
        Длина_волос: anket.Длина_волос,
        Общее_состояние_здоровья: anket.Общее_состояние_здоровья,
        Вредные_привычки: anket.Вредные_привычки,
        Место_жительства: anket.Место_жительства,
        Жилищные_условия: anket.Жилищные_условия,
        С_кем_проживаете: anket.С_кем_проживаете,
        Материальное_положение: anket.Материальное_положение,
        Наличие_автомобиля: anket.Наличие_автомобиля,
        Водительское_удостоверение: anket.Водительское_удостоверение,
        Образование: anket.Образование,
        Специальность: anket.Специальность,
        Знание_иностранных_языков: anket.Знание_иностранных_языков,
        Сфера_деятельности_в_настоящее_время:
          anket.Сфера_деятельности_в_настоящее_время,
        Должность: anket.Должность,
        Семейное_положение: anket.Семейное_положение,
        Ранее_были_замужем_или_женаты: anket.Ранее_были_замужем_или_женаты,
        Наличие_детей: anket.Наличие_детей,
        Пол_детей: anket.Пол_детей,
        Возраст_детей: anket.Возраст_детей,
        Опишите_кратко_свой_характер: anket.Опишите_кратко_свой_характер,
        Верите_ли_вы_в_любовь_с_первого_взгляда:
          anket.Верите_ли_вы_в_любовь_с_первого_взгляда,
        Привлекались_ли_вы_к_уголовной_ответственности:
          anket.Привлекались_ли_вы_к_уголовной_ответственности,
        Готовы_ли_вы_к_переменам: anket.Готовы_ли_вы_к_переменам,
        Какие_качества_вы_цените_в_людях:
          anket.Какие_качества_вы_цените_в_людях,
        Любите_ли_вы_делать_сюрпризы: anket.Любите_ли_вы_делать_сюрпризы,
        Ваши_достоинства_и_недостатки: anket.Ваши_достоинства_и_недостатки,
        Семейнобытовые_обязанности: anket.Семейнобытовые_обязанности,
        Предпочтения_в_еде: anket.Предпочтения_в_еде,
        Умеете_и_любите_ли_вы_готовить: anket.Умеете_и_любите_ли_вы_готовить,
        Увлечения_хобби: anket.Увлечения_хобби,
        Вы_романтик: anket.Вы_романтик,
        Были_ли_в_вашей_жизни_необычные_свидания:
          anket.Были_ли_в_вашей_жизни_необычные_свидания,
        Занимаетесь_ли_вы_спортом: anket.Занимаетесь_ли_вы_спортом,
      });
    });

    // Записываем рабочую книгу в файл
    const filePath = "./ankets.xlsx";
    await workbook.xlsx.writeFile(filePath);

    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.setHeader("Content-Disposition", "attachment; filename=" + filePath);

    // res.sendFile(filePath, { root: __dirname }, () => {
    //   // Удаляем файл после завершения отправки
    //   fs.unlink(filePath);
    // });

    res.download(filePath, "ankets.xlsx", () => {
      // Удаляем файл после завершения загрузки
      fs.unlink(filePath);
    });
  } catch (error) {
    console.log("error", error);
  }
});


router.get("/exportToExcelWish", async (req, res) => {
  try {
    const allWishes = await Wish.findAll();

    // Создаем новую рабочую книгу
    const workbook = new ExcelJS.Workbook();

    // Добавляем новый лист в рабочую книгу
    const worksheet = workbook.addWorksheet("Wishes");

    // Добавляем заголовки столбцов в лист
    worksheet.columns = [

      { header: "ID", key: "id", width: 10 },
      { header: "Возраст", key: "Возраст", width: 20 },
      { header: "Знаки_Зодиака", key: "Знаки_Зодиака", width: 20 },
      { header: "Национальность", key: "Национальность", width: 20 },
      { header: "Рост", key: "Рост", width: 20 },
      { header: "Вес", key: "Вес", width: 20 },
      { header: "Телосложение", key: "Телосложение", width: 20 },
      { header: "Цвет_волос", key: "Цвет_волос", width: 20 },
      { header: "Длина_волос", key: "Длина_волос", width: 20 },
      { header: "Усы_борода", key: "Усы_борода", width: 20 },
      { header: "Наличие_вредных_привычек", key: "Наличие_вредных_привычек", width: 20 },
      { header: "Совместное_проживание", key: "Совместное_проживание", width: 20 },
      { header: "Материальное_положение_партнера", key: "Материальное_положение_партнера", width: 20 },
      { header: "Автомобиль", key: "Автомобиль", width: 20 },
      { header: "Водительское_удостоверение", key: "Водительское_удостоверение", width: 20 },
      { header: "Профессиональный_статус", key: "Профессиональный_статус", width: 20 },
      { header: "Образование", key: "Образование", width: 20 },
      { header: "Знание_иностранных_языков", key: "Знание_иностранных_языков", width: 20 },
      { header: "Наличие_опыта_супружеской_жизни", key: "Наличие_опыта_супружеской_жизни", width: 20 },
      { header: "Наличие_детей", key: "Наличие_детей", width: 20 },
      { header: "Пожелания_к_характеру", key: "Пожелания_к_характеру", width: 20 },
      { header: "Семейнобытовые_обязанности", key: "Семейнобытовые_обязанности", width: 20 },
      { header: "Важно_ли_Вам_что_бы_партнёр_готовил", key: "Важно_ли_Вам_что_бы_партнёр_готовил", width: 20 },
      { header: "Увлечения_хобби", key: "Увлечения_хобби", width: 20 },
      { header: "Важно_ли_Вам_чтобы_партнёр_занимался_спортом", key: "Важно_ли_Вам_чтобы_партнёр_занимался_спортом", width: 20 },
      { header: "Дополнительные_пожелания", key: "Дополнительные_пожелания", width: 20 },

    ];

    // Добавляем данные из каждой анкеты в лист
    allWishes.forEach((wish) => {
      worksheet.addRow({
    Возраст: wish.Возраст,
    Знаки_Зодиака: wish.Знаки_Зодиака,
    Национальность: wish.Национальность,
    Рост: wish.Рост,
    Вес: wish.Вес,
    Телосложение: wish.Телосложение,
    Цвет_волос: wish.Цвет_волос,
    Длина_волос: wish.Длина_волос,
    Усы_борода: wish.Усы_борода,
    Наличие_вредных_привычек: wish.Наличие_вредных_привычек,
    Совместное_проживание: wish.Совместное_проживание,
    Материальное_положение_партнера: wish.Материальное_положение_партнера,
    Автомобиль: wish.Автомобиль,
    Водительское_удостоверение: wish.Водительское_удостоверение,
    Профессиональный_статус: wish.Профессиональный_статус,
    Образование: wish.Образование,
    Желаемая_сфера_деятельности: wish.Желаемая_сфера_деятельности,
    Знание_иностранных_языков: wish.Знание_иностранных_языков,
    Наличие_опыта_супружеской_жизни: wish.Наличие_опыта_супружеской_жизни,
    Наличие_детей: wish.Наличие_детей,
    Пожелания_к_характеру: wish.Пожелания_к_характеру,
    Семейнобытовые_обязанности: wish.Семейнобытовые_обязанности,
    Важно_ли_Вам_что_бы_партнёр_готовил: wish.Важно_ли_Вам_что_бы_партнёр_готовил,
    Увлечения_хобби: wish.Увлечения_хобби,
    Важно_ли_Вам_чтобы_партнёр_занимался_спортом: wish.Важно_ли_Вам_чтобы_партнёр_занимался_спортом,
    Дополнительные_пожелания: wish.Дополнительные_пожелания,
      });
    });

    // Записываем рабочую книгу в файл
    const filePath = "./wishes.xlsx";
    await workbook.xlsx.writeFile(filePath);

    // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // res.setHeader("Content-Disposition", "attachment; filename=" + filePath);

    // res.sendFile(filePath, { root: __dirname }, () => {
    //   // Удаляем файл после завершения отправки
    //   fs.unlink(filePath);
    // });

    res.download(filePath, "wishes.xlsx", () => {
      // Удаляем файл после завершения загрузки
      fs.unlink(filePath);
    });
  } catch (error) {
    console.log("error", error);
  }
});

router.delete("/ankets", async (req, res) => {
  const { id } = req.body;
  await Anketa.destroy({ where: { id } });
  res.sendStatus(200);
});

router.post("/oneDate", async (req, res) => {
  const { id } = req.body;
  const oneDate = await DateType.findOne({ where: { id } });
  res.json(oneDate);
});

router.post("/form", async (req, res) => {
  const {
    Фамилия,
    Имя,
    Отчество,
    Контактный_телефон,
    еmail,
    Дата_рождения,
    Полных_лет,
    Знак_Зодиака,
    Национальность,
    Пол,
    Рост,
    Вес,
    Телосложение,
    Цвет_глаз,
    Цвет_волос,
    Длина_волос,
    Общее_состояние_здоровья,
    Вредные_привычки,
    Место_жительства,
    Жилищные_условия,
    С_кем_проживаете,
    Материальное_положение,
    Наличие_автомобиля,
    Водительское_удостоверение,
    Образование,
    Специальность,
    Знание_иностранных_языков,
    Сфера_деятельности_в_настоящее_время,
    Должность,
    Семейное_положение,
    Ранее_были_замужем_или_женаты,
    Наличие_детей,
    Пол_детей,
    Возраст_детей,
    Опишите_кратко_свой_характер,
    Верите_ли_вы_в_любовь_с_первого_взгляда,
    Привлекались_ли_вы_к_уголовной_ответственности,
    Готовы_ли_вы_к_переменам,
    Какие_качества_вы_цените_в_людях,
    Любите_ли_вы_делать_сюрпризы,
    Ваши_достоинства_и_недостатки,
    Семейнобытовые_обязанности,
    Предпочтения_в_еде,
    Умеете_и_любите_ли_вы_готовить,
    Увлечения_хобби,
    Вы_романтик,
    Были_ли_в_вашей_жизни_необычные_свидания,
    Занимаетесь_ли_вы_спортом,
  } = req.body;

  const user = await User.findOne({ where: { phone: req.session.phone } });
  const userPhone = `+${Контактный_телефон.countryCode}${Контактный_телефон.areaCode}${Контактный_телефон.phoneNumber}`;
  const birthDate = new Date(Дата_рождения).toLocaleDateString();
  const photo = user.photo;
  const photo2 = user.photo2;

  const mailData = {
    from: "duet.rybinsk@gmail.com",
    to: "duet.rybinsk@gmail.com",
    subject: `Анкета пользователя от ${user.name}, телефон ${user.phone}`,
    text: " ",

    html: `
    Фото: http://duet-marriage.ru:8443${photo}<br>
    Фото_в_полный_рост: http://duet-marriage.ru:8443${photo2}<br>
    Фамилия:  ${Фамилия}<br>
    Имя: ${Имя}<br>
    Отчество: ${Отчество}<br>
    Контактный_телефон: ${userPhone}<br>
    еmail: ${еmail}<br>
    Дата_рождения: ${birthDate}<br>
    Полных_лет: ${Полных_лет}<br>
    Знак_Зодиака: ${Знак_Зодиака}<br>
    Национальность: ${Национальность}<br>
    Рост: ${Рост}<br>
    Вес: ${Вес}<br>
    Телосложение: ${Телосложение}<br>
    Цвет_глаз: ${Цвет_глаз}<br>
    Цвет_волос: ${Цвет_волос}<br>
    Длина_волос :${Длина_волос}<br>
    Общее_состояние_здоровья: ${Общее_состояние_здоровья}<br>
    Вредные_привычки: ${Вредные_привычки}<br>
    Место_жительства: ${Место_жительства}<br>
    Жилищные_условия: ${Жилищные_условия}<br>
    С_кем_проживаете: ${С_кем_проживаете}<br>
    Материальное_положение: ${Материальное_положение}<br>
    Наличие_автомобиля: ${Наличие_автомобиля}<br>
    Водительское_удостоверение: ${Водительское_удостоверение}<br>
    Образование: ${Образование}<br>
    Специальность: ${Специальность}<br>
    Знание_иностранных_языков: ${Знание_иностранных_языков}<br>
    Сфера_деятельности_в_настоящее_время: ${Сфера_деятельности_в_настоящее_время}<br>
    Должность: ${Должность}<br>
    Семейное_положение: ${Семейное_положение}<br>
    Ранее_были_замужем_или_женаты: ${Ранее_были_замужем_или_женаты}<br>
    Наличие_детей: ${Наличие_детей}<br>
    Пол_детей: ${Пол_детей}<br>
    Возраст_детей: ${Возраст_детей}<br>
    Опишите_кратко_свой_характер: ${Опишите_кратко_свой_характер}<br>
    Верите_ли_вы_в_любовь_с_первого_взгляда: ${Верите_ли_вы_в_любовь_с_первого_взгляда}<br>
    Привлекались_ли_вы_к_уголовной_ответственности: ${Привлекались_ли_вы_к_уголовной_ответственности}<br>
    Готовы_ли_вы_к_переменам: ${Готовы_ли_вы_к_переменам}<br>
    Какие_качества_вы_цените_в_людях: ${Какие_качества_вы_цените_в_людях}<br>
    Любите_ли_вы_делать_сюрпризы: ${Любите_ли_вы_делать_сюрпризы}<br>
    Ваши_достоинства_и_недостатки: ${Ваши_достоинства_и_недостатки}<br>
    Семейнобытовые_обязанности: ${Семейнобытовые_обязанности}<br>
    Предпочтения_в_еде: ${Предпочтения_в_еде}<br>
    Умеете_и_любите_ли_вы_готовить: ${Умеете_и_любите_ли_вы_готовить}<br>
    Увлечения_хобби: ${Увлечения_хобби}<br>
    Вы_романтик: ${Вы_романтик}<br>
    Были_ли_в_вашей_жизни_необычные_свидания: ${Были_ли_в_вашей_жизни_необычные_свидания}<br>
    Занимаетесь_ли_вы_спортом: ${Занимаетесь_ли_вы_спортом}<br>
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log("error", error);
    }
    console.log("Письмо отправлено");
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
  try {
    const newAnketa = await Anketa.create({
      Фамилия,
      Имя,
      Отчество,
      Контактный_телефон: userPhone,
      еmail,
      Дата_рождения: birthDate,
      Полных_лет,
      Знак_Зодиака,
      Национальность,
      Пол,
      Рост,
      Вес,
      Телосложение,
      Цвет_глаз,
      Цвет_волос,
      Длина_волос,
      Общее_состояние_здоровья,
      Вредные_привычки,
      Место_жительства,
      Жилищные_условия,
      С_кем_проживаете,
      Материальное_положение,
      Наличие_автомобиля,
      Водительское_удостоверение,
      Образование,
      Специальность,
      Знание_иностранных_языков,
      Сфера_деятельности_в_настоящее_время,
      Должность,
      Семейное_положение,
      Ранее_были_замужем_или_женаты,
      Наличие_детей,
      Пол_детей,
      Возраст_детей,
      Опишите_кратко_свой_характер,
      Верите_ли_вы_в_любовь_с_первого_взгляда,
      Привлекались_ли_вы_к_уголовной_ответственности,
      Готовы_ли_вы_к_переменам,
      Какие_качества_вы_цените_в_людях,
      Любите_ли_вы_делать_сюрпризы,
      Ваши_достоинства_и_недостатки,
      Семейнобытовые_обязанности,
      Предпочтения_в_еде,
      Умеете_и_любите_ли_вы_готовить,
      Увлечения_хобби,
      Вы_романтик,
      Были_ли_в_вашей_жизни_необычные_свидания,
      Занимаетесь_ли_вы_спортом,
      user_id: user.id,
    });
    res.json(newAnketa);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/partner", async (req, res) => {
  const {
    Возраст,
    Знаки_Зодиака,
    Национальность,
    Рост,
    Вес,
    Телосложение,
    Цвет_волос,
    Длина_волос,
    Усы_борода,
    Наличие_вредных_привычек,
    Совместное_проживание,
    Материальное_положение_партнера,
    Автомобиль,
    Водительское_удостоверение,
    Профессиональный_статус,
    Образование,
    Желаемая_сфера_деятельности,
    Знание_иностранных_языков,
    Наличие_опыта_супружеской_жизни,
    Наличие_детей,
    Пожелания_к_характеру,
    Семейнобытовые_обязанности,
    Важно_ли_Вам_что_бы_партнёр_готовил,
    Увлечения_хобби,
    Важно_ли_Вам_чтобы_партнёр_занимался_спортом,
    Дополнительные_пожелания,
  } = req.body;

  try {
    const user = await User.findOne({ where: { phone: req.session.phone } });
    const mailData = {
      from: "duet.rybinsk@gmail.com",
      to: "duet.rybinsk@gmail.com",
      subject: `Пожелания к партнеру от ${user.name}, телефон ${user.phone}`,
      text: " ",

      html: `
      Возраст: ${Возраст}<br>
      Знаки_Зодиака: ${Знаки_Зодиака}<br>
      Национальность: ${Национальность}<br>
      Рост: ${Рост}<br>
      Вес: ${Вес}<br>
      Телосложение: ${Телосложение}<br>
      Цвет_волос: ${Цвет_волос}<br>
      Длина_волос: ${Длина_волос}<br>
      Усы_борода: ${Усы_борода}<br>
      Наличие_вредных_привычек: ${Наличие_вредных_привычек}<br>
      Совместное_проживание: ${Совместное_проживание}<br>
      Материальное_положение_партнера: ${Материальное_положение_партнера}<br>
      Автомобиль: ${Автомобиль}<br>
      Водительское_удостоверение: ${Водительское_удостоверение}<br>
      Профессиональный_статус: ${Профессиональный_статус}<br>
      Образование: ${Образование}<br>
      Желаемая_сфера_деятельности: ${Желаемая_сфера_деятельности}<br>
      Знание_иностранных_языков: ${Знание_иностранных_языков}<br>
      Наличие_опыта_супружеской_жизни: ${Наличие_опыта_супружеской_жизни}<br>
      Наличие_детей: ${Наличие_детей}<br>
      Пожелания_к_характеру: ${Пожелания_к_характеру}<br>
      Семейнобытовые_обязанности: ${Семейнобытовые_обязанности}<br>
      Важно_ли_Вам_что_бы_партнёр_готовил: ${Важно_ли_Вам_что_бы_партнёр_готовил}<br>
      Увлечения_хобби: ${Увлечения_хобби}<br>
      Важно_ли_Вам_чтобы_партнёр_занимался_спортом: ${Важно_ли_Вам_чтобы_партнёр_занимался_спортом}<br>
      Дополнительные_пожелания: ${Дополнительные_пожелания}<br>
      
      `,
    };

    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log("error", error);
      }
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });
const ageRange = Возраст.map((el) => el.replace('_', ','))
const ageRange2 = ageRange.map((el) => el.split(',')).flat()
const ageRange3 = ageRange2.map((el) => Number(el))
const min = Math.min(...ageRange3)
const max = Math.max(...ageRange3)
const ageArrRange = [min, max]

    const newWish = await Wish.create({
      Возраст: ageArrRange.join(', '),
      Знаки_Зодиака,
      Национальность,
      Рост: Рост.join(', '),
      Вес,
      Телосложение,
      Цвет_волос,
      Длина_волос,
      Усы_борода,
      Наличие_вредных_привычек,
      Совместное_проживание,
      Материальное_положение_партнера,
      Автомобиль,
      Водительское_удостоверение,
      Профессиональный_статус,
      Образование: Образование.join(', '),
      Желаемая_сфера_деятельности,
      Знание_иностранных_языков,
      Наличие_опыта_супружеской_жизни,
      Наличие_детей,
      Пожелания_к_характеру,
      Семейнобытовые_обязанности,
      Важно_ли_Вам_что_бы_партнёр_готовил,
      Увлечения_хобби,
      Важно_ли_Вам_чтобы_партнёр_занимался_спортом,
      Дополнительные_пожелания,
      user_id: user.id,
    });
    res.json(newWish);
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/dateTypes", async (req, res) => {
  console.log('tyt')
  const dateTypes = await DateType.findAll({include: "DateRatings"});
  res.json(dateTypes);
});


router.post('/newRating', async (req, res) => {
  const {value, id} = req.body
  const newRating = await DateRating.create({
    rating: value,
    dateType_id: id
  })
  res.sendStatus(200)
})



router.get("/usersEvent", async (req, res) => {
  try {
    const { phone } = req.session;
    // const user = await User.findOne({where: {phone}})
    const events = await Event.findAll({ where: { clientPhone: phone } });
    res.json(events);
  } catch (error) {
    console.log("error", error);
  }
});

router.post("/order", async (req, res) => {
  if (req.session.login) {
    const { login } = req.session;
    const user = await User.findOne({ where: { phone: req.session.phone } });
    const {
      dateTitle,
      extraOptions,
      price,
      selectedDate,
      otherExtra,
      clientName,
      phone,
    } = req.body;
    const newEvent = Event.create({
      dateTitle,
      extraOptions,
      price,
      selectedDate,
      clientName: user.name,
      clientPhone: user.phone,
    });
    const mailData = {
      from: "duet.rybinsk@gmail.com",
      to: "duet.rybinsk@gmail.com",
      subject: `Новая заявка на свидание от ${user.name}, телефон ${user.phone}`,
      text: " ",

      html: `
      ${user.name} Оставил заявку на свидание на ${dateTitle} ${selectedDate} <br>
      В дополнительных пожеланиях указал: ${extraOptions} <br>
      В свободной форме дополнил: ${otherExtra} <br>
      Минимальная цена: ${price}р <br>
      Должна была прийти предоплата в размере ${price / 2}р <br>
      Телефон: ${user.phone} 
      `,
    };
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log("error", error);
      }
      console.log("Письмо отправлено");
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });
    res.json(newEvent);
  } else {
    const {
      dateTitle,
      extraOptions,
      price,
      selectedDate,
      otherExtra,
      clientName,
      phone,
    } = req.body;
    const userPhone = `+${phone.countryCode}${phone.areaCode}${phone.phoneNumber}`;
    const newEvent = Event.create({
      dateTitle,
      extraOptions,
      price,
      selectedDate,
      clientName,
      clientPhone: userPhone,
    });
    const mailData = {
      from: "duet.rybinsk@gmail.com",
      to: "duet.rybinsk@gmail.com",
      subject: `Новая заявка на свидание от ${clientName}, телефон ${userPhone}`,
      text: " ",

      html: `
      ${clientName} оставил заявку на  ${dateTitle} ${selectedDate} <br>
      В дополнительных опциях указал: ${extraOptions}, в свободной форме пожелал: ${otherExtra}<br>
      Минимальная цена: ${price}р <br>
      Должна была прийти предоплата в размере ${price / 2} <br>
      Телефон: ${userPhone} 
      `,
    };
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        return console.log("error", error);
      }
      res
        .status(200)
        .send({ message: "Mail send", message_id: info.messageId });
    });
    res.json(newEvent);
  }
});

module.exports = router;
