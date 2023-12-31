'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    body: DataTypes.TEXT,
    approved: DataTypes.BOOLEAN,
    answer: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};