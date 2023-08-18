'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DateRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({DateType}) {
      this.belongsTo(DateType, { foreignKey: 'dateType_id' });
    }
  }
  DateRating.init({
    rating: DataTypes.INTEGER,
    dateType_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DateRating',
  });
  return DateRating;
};