'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Wish.init({
    Возраст: DataTypes.STRING,
    Знаки_Зодиака: DataTypes.STRING,
    Национальность: DataTypes.STRING,
    Рост: DataTypes.STRING,
    Вес: DataTypes.STRING,
    Телосложение: DataTypes.STRING,
    Цвет_волос: DataTypes.STRING,
    Длина_волос: DataTypes.STRING,
    Усы_борода: DataTypes.STRING,
    Наличие_вредных_привычек: DataTypes.STRING,
    Совместное_проживание: DataTypes.STRING,
    Материальное_положение_партнера: DataTypes.STRING,
    Автомобиль: DataTypes.STRING,
    Водительское_удостоверение: DataTypes.STRING,
    Профессиональный_статус: DataTypes.STRING,
    Образование: DataTypes.STRING,
    Желаемая_сфера_деятельности: DataTypes.STRING,
    Знание_иностранных_языков: DataTypes.STRING,
    Наличие_опыта_супружеской_жизни: DataTypes.STRING,
    Наличие_детей: DataTypes.STRING,
    Пожелания_к_характеру: DataTypes.STRING,
    Семейнобытовые_обязанности: DataTypes.STRING,
    Важно_ли_Вам_что_бы_партнёр_готовил: DataTypes.STRING,
    Увлечения_хобби: DataTypes.STRING,
    Важно_ли_Вам_чтобы_партнёр_занимался_спортом: DataTypes.STRING,
    Дополнительные_пожелания: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wish',
  });
  return Wish;
};