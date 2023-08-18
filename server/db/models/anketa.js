'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anketa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Anketa.init({
    Фамилия: DataTypes.STRING,
    Имя: DataTypes.STRING,
    Отчество: DataTypes.STRING,
    Контактный_телефон: DataTypes.STRING,
    еmail: DataTypes.STRING,
    Дата_рождения: DataTypes.STRING,
    Полных_лет: DataTypes.STRING,
    Знак_Зодиака: DataTypes.STRING,
    Национальность: DataTypes.STRING,
    Пол: DataTypes.STRING,
    Рост: DataTypes.STRING,
    Вес: DataTypes.STRING,
    Телосложение: DataTypes.STRING,
    Цвет_глаз: DataTypes.STRING,
    Цвет_волос: DataTypes.STRING,
    Длина_волос: DataTypes.STRING,
    Общее_состояние_здоровья: DataTypes.STRING,
    Вредные_привычки: DataTypes.STRING,
    Место_жительства: DataTypes.STRING,
    Жилищные_условия: DataTypes.STRING,
    С_кем_проживаете: DataTypes.STRING,
    Материальное_положение: DataTypes.STRING,
    Наличие_автомобиля: DataTypes.STRING,
    Водительское_удостоверение: DataTypes.STRING,
    Образование: DataTypes.STRING,
    Специальность: DataTypes.STRING,
    Знание_иностранных_языков: DataTypes.STRING,
    Сфера_деятельности_в_настоящее_время: DataTypes.STRING,
    Должность: DataTypes.STRING,
    Семейное_положение: DataTypes.STRING,
    Ранее_были_замужем_или_женаты: DataTypes.STRING,
    Наличие_детей: DataTypes.STRING,
    Пол_детей: DataTypes.STRING,
    Возраст_детей: DataTypes.STRING,
    Опишите_кратко_свой_характер: DataTypes.STRING,
    Верите_ли_вы_в_любовь_с_первого_взгляда: DataTypes.STRING,
    Привлекались_ли_вы_к_уголовной_ответственности: DataTypes.STRING,
    Готовы_ли_вы_к_переменам: DataTypes.STRING,
    Какие_качества_вы_цените_в_людях: DataTypes.STRING,
    Любите_ли_вы_делать_сюрпризы: DataTypes.STRING,
    Ваши_достоинства_и_недостатки: DataTypes.STRING,
    Семейнобытовые_обязанности: DataTypes.STRING,
    Предпочтения_в_еде: DataTypes.STRING,
    Умеете_и_любите_ли_вы_готовить: DataTypes.STRING,
    Увлечения_хобби: DataTypes.STRING,
    Вы_романтик: DataTypes.STRING,
    Были_ли_в_вашей_жизни_необычные_свидания: DataTypes.STRING,
    Занимаетесь_ли_вы_спортом: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Anketa',
  });
  return Anketa;
};