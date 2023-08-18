'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DateType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({DateRating}) {
      this.hasMany(DateRating, { foreignKey: 'dateType_id' });
    }
  }
  DateType.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING,
    price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DateType',
  });
  return DateType;
};