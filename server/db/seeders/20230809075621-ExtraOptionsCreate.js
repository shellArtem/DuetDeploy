'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExtraOptions', [{
      title: "Живая музыка",
      amount: false,
      price:  '4000',
      createdAt: new Date(),
      updatedAt: new Date(),
     }, 
     {
      title: "Ужин",
      amount: false,
      price:  '2000',
      createdAt: new Date(),
      updatedAt: new Date(),
     }, 
     {
      title: "Воздушные шары",
      amount: true,
      price:  '150',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      title: "Небесные огни",
      amount: true,
      price:  '300',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      title: "Цветы",
      amount: false,
      price:  '2000',
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      title: "Услуги фотографа",
      amount: false,
      price:  '4000',
      createdAt: new Date(),
      updatedAt: new Date(),
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
