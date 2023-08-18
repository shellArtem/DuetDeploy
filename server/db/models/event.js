'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    dateTitle: DataTypes.STRING,
    extraOptions: DataTypes.STRING,
    price: DataTypes.STRING,
    selectedDate: DataTypes.STRING,
    clientName: DataTypes.STRING,
    clientPhone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};