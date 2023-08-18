'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Anketa, Wish}) {
      this.hasMany(Anketa, { foreignKey: 'user_id' });
      this.hasMany(Wish, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    photo2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};