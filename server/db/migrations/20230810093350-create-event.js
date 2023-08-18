'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dateTitle: {
        type: Sequelize.STRING
      },
      extraOptions: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      selectedDate: {
        type: Sequelize.STRING
      },
      clientName: {
        type: Sequelize.STRING
      },
      clientPhone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};