'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExtraOptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExtraOptions.init({
    title: DataTypes.STRING,
    amount: DataTypes.BOOLEAN,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExtraOptions',
  });
  return ExtraOptions;
};