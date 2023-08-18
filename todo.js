// ! Инициализация проекта
// * npm init -y
// * npx eslint --init
// * npx create-gitignore node
// * npm i express
// * npm i -D nodemon morgan
// * npm i @babel/core @babel/preset-env @babel/preset-react @babel/register react react-dom
// todo создай файл .babelrc и добавь в него:
/*
  { presets: [   @babel/preset-env,   @babel/preset-react ]
  }
*/
// todo Добавь скрипты dev и start в package.json
/*
dev: nodemon app.js --ext js,jsx,
start: node app.js
*/
// ! Инициализация базы данных
// * npm i sequelize sequelize-cli pg pg-hstore
// todo создай файл .sequelizerc и добавь в него:
/*
const path = require('path');
module.exports = { 'config': path.resolve('db', 'config', 'database.json'), 'models-path': path.resolve('db', 'models'), 'seeders-path': path.resolve('db', 'seeders'), 'migrations-path': path.resolve('db', 'migrations'),
};
*/
// * npx sequelize init
// * npx sequelize db:create
// * npx sequelize model:generate --name User --attributes name:string,password:string
// * npx sequelize db:migrate
// * npx sequelize db:migrate:undo:all
// todo Для заполения базы (пример через faker):
// ? npm i @faker-js/faker
// * npx sequelize-cli seed:generate --name User
// * npx sequelize db:seed:all

// ! Установка зависимостей

// * в миграциях:

user_id: { type: Sequelize.INTEGER, references: {   model: 'Users',   key: 'id', },   },

// * в моделях:

static associate({ User }) {   // define association here   this.belongsTo(User, { foreignKey: 'user_id' }); }


// ! env - переменные окружения (среды), в них будем класть подключение к базе, порт и т.п.
// * npm i dotenv
// todo создай файл .env и .env_example (чтобы он был для примера и запушился на GitHub) и
// todo добавь в файл .env переменные PORT и DB (подключение к БД)

PORT=3000
DB_URL=postgres://postgres:123@localhost:5432/I_like_it
SESSION_SECRET=rdvgfhjfcu8sfjifd

// ! Не забудь добавить всё из файла .env в файл .env_example
// todo подключи donenv к app.js и .sequelizerc
// ! Если не добавить в файлы, то переменные PORT и DB не увидит
// * require('dotenv').config();
// todo замени в db/config/database.json содержимое development на :
/*
use_env_variable: DB_URL,
dialect: postgres
*/
// * Проверка подключения к базе через sequelize
// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize('studentswhales', 'whale2', '1', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// async function checkConnect() {
//   try {
/  await sequelize.authenticate()
/  console.log('БАЗА ПОДКЛЮЧЕНА!')
//   } catch (error) {
/  console.log('БАЗА НЕ ПОДКЛЮЧЕНАЯ ==>', error)
//   }
// }
// checkConnect()

// ! Статика - файлы, доступные в браузере (клиентские файлы, папка public)
// * app.use(express.static(path.join(process.cwd(), 'public')));

// todo напиши роуты и jsx компоненты для рендера
// ! Подключи роуты к app.js

// ! bootstrap
// * https://getbootstrap.com/docs/5.3/getting-started/introduction/#cdn-links
// ? navbar
// * https://getbootstrap.com/docs/5.3/components/navbar/#nav
// ? card
// * https://getbootstrap.com/docs/5.3/components/card/
// todo подключение в Layout
/*
<link href=https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css rel=stylesheet integrity=sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi crossOrigin=anonymous />
<script src=https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js integrity=sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3 crossOrigin=anonymous />
*/

// * npm i express-session session-file-store bcrypt

// ! Важно для экзамена !
// * Добавь в скрипт
// * dev: nodemon app.js --ignore sessions --ext js,jsx,

// ! Важно для экзамена !
// * Добавь  папку sessions в gitignore

// * require всего необходимого в app
/*
const session = require('express-session')
const FileStore = require('session-file-store')(session)
*/

// * Конфиг для куки в виде файла сессий
const sessionConfig = {
  name: 'RaccoonsCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: { maxAge: 9999999, // * время жизни в мс (ms) httpOnly: true,
  },
};
// * Подключи сессии как мидлу
app.use(session(sessionConfig));


Создание фронта на Reacte: 

// npm create vite@latest client -- --template react-ts

Подключение Redux: 

// npm install -D @redux-devtools/extension
// npm i @reduxjs/toolkit
// npm i react-redux

Подключение react-router-dom:

// npm i react-router-dom

// Фамилия:string Имя:string Отчество:string Контактный телефон:string еmail:string Дата рождения:string Полных лет:string Знак Зодиака:string Национальность:string Рост:string Вес:string Телосложение:string Цвет глаз:string Цвет волос:string Длина волос:string Общее состояние здоровья:string Вредные привычки:string Место жительства (город, район):string Жилищные условия:string С кем проживаете:string Материальное положение:string Наличие автомобиля:string Водительское удостоверение:string Образование:string Специальность:string Знание иностранных языков:string Сфера деятельности в настоящее время:string Должность:string Семейное положение:string Ранее были замужем / женаты:string Наличие детей:string Пол детей:string Возраст детей:string Опишите кратко свой характер:string Верите ли вы в любовь с первого взгляда?:string Привлекались ли вы к уголовной ответственности?:string Готовы ли вы к переменам?:string Какие качества вы цените в людях?:string Любите ли вы делать сюрпризы? Подарки?:string Ваши достоинства и недостатки:string Семейно-бытовые обязанности:string Предпочтения в еде:string Умеете и любите ли вы готовить?:string Увлечения,хобби:string Вы романтик?:string Были ли в вашей жизни необычные свидания ? Опишите?:string Занимаетесь ли вы спортом?:string

// npx sequelize model:generate --name Anketa --attributes Фамилия:string,Имя:string,Отчество:string,Контактный_телефон:string,еmail:string,Дата_рождения:string,Полных_лет:string,Знак_Зодиака:string,Национальность:string,Рост:string,Вес:string,Телосложение:string,Цвет_глаз:string,Цвет_волос:string,Длина_волос:string,Общее_состояние_здоровья:string,Вредные_привычки:string,Место_жительства:string,Жилищные_условия:string,С_кем_проживаете:string,Материальное_положение:string,Наличие_автомобиля:string,Водительское_удостоверение:string,Образование:string,Специальность:string,Знание_иностранных_языков:string,Сфера_деятельности_в_настоящее_время:string,Должность:string,Семейное_положение:string,Ранее_были_замужем_или_женаты:string,Наличие_детей:string,Пол_детей:string,Возраст_детей:string,Опишите_кратко_свой_характер:string,Верите_ли_вы_в_любовь_с_первого_взгляда:string,Привлекались_ли_вы_к_уголовной_ответственности:string,Готовы_ли_вы_к_переменам:string,Какие_качества_вы_цените_в_людях:string,Любите_ли_вы_делать_сюрпризы:string,Ваши_достоинства_и_недостатки:string,Семейнобытовые_обязанности:string,Предпочтения_в_еде:string,Умеете_и_любите_ли_вы_готовить:string,Увлечения_хобби:string,Вы_романтик:string,Были_ли_в_вашей_жизни_необычные_свидания:string,Занимаетесь_ли_вы_спортом:string,user_id:integer

// еmail:string Дата рождения:string Полных лет:string Знак Зодиака:string Национальность:string Рост:string Вес:string Телосложение:string Цвет глаз:string Цвет волос:string Длина волос:string Общее состояние здоровья:string Вредные привычки:string Место жительства (город, район):string Жилищные условия:string С кем проживаете:string Материальное положение:string Наличие автомобиля:string Водительское удостоверение:string Образование:string Специальность:string Знание иностранных языков:string Сфера деятельности в настоящее время:string Должность:string Семейное положение:string Ранее были замужем / женаты:string Наличие детей:string Пол детей:string Возраст детей:string Опишите кратко свой характер:string Верите ли вы в любовь с первого взгляда?:string Привлекались ли вы к уголовной ответственности?:string Готовы ли вы к переменам?:string Какие качества вы цените в людях?:string Любите ли вы делать сюрпризы? Подарки?:string Ваши достоинства и недостатки:string Семейно-бытовые обязанности:string Предпочтения в еде:string Умеете и любите ли вы готовить?:string Увлечения,хобби:string Вы романтик?:string Были ли в вашей жизни необычные свидания ? Опишите?:string Занимаетесь ли вы спортом?:string"


npx sequelize model:generate --name DateRating --attributes rating:integer,dateType_id:integer