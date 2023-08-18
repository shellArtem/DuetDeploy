'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('News', [{
        body: "Теперь найти любовь стало проще!",
        pic: 'https://wp-s.ru/wallpapers/1/94/560083132035072/vlyubl-nnaya-para-na-zakate-na-mashine.jpg',
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
