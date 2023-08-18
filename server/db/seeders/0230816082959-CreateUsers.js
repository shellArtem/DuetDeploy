'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
      name: 'Елена',
      phone: '+77868594896',
      password: '1',
      photo: '/uploads/user/drysfl8xcdg8rh0sgofiumnddrpr4gzq.jpeg',
      photo2: 'ban1-800x1000',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Жанна',
      phone: "+75369494816",
      password: '2',
      photo: '/uploads/user/KMO_148127_03697_1_t218_192312.jpeg',
      photo2: 'ban1-800x1000',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Андрей',
      phone: "+76315824816",
      password: '3',
      photo: 'ban1-800x1000',
      photo2: 'ban1-800x1000',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name: 'Илья',
      phone: "+76355874831",
      password: '4',
      photo: 'ban1-800x1000',
      photo2: 'ban1-800x1000',
      createdAt: new Date(),
      updatedAt: new Date()
     },

    ], {});

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
