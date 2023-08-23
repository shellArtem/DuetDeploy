const bcrypt = require('bcrypt');

/ @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash('760314Nadya.85', 10);
    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      phone: '+79201083306',
      password: hash,
      photo: '',
      photo2: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});
     
  },
};