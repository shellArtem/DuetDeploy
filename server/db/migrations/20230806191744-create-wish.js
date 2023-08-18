'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wishes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Возраст: {
        type: Sequelize.STRING
      },
      Знаки_Зодиака: {
        type: Sequelize.STRING
      },
      Национальность: {
        type: Sequelize.STRING
      },
      Рост: {
        type: Sequelize.STRING
      },
      Вес: {
        type: Sequelize.STRING
      },
      Телосложение: {
        type: Sequelize.STRING
      },
      Цвет_волос: {
        type: Sequelize.STRING
      },
      Длина_волос: {
        type: Sequelize.STRING
      },
      Усы_борода: {
        type: Sequelize.STRING
      },
      Наличие_вредных_привычек: {
        type: Sequelize.STRING
      },
      Совместное_проживание: {
        type: Sequelize.STRING
      },
      Материальное_положение_партнера: {
        type: Sequelize.STRING
      },
      Автомобиль: {
        type: Sequelize.STRING
      },
      Водительское_удостоверение: {
        type: Sequelize.STRING
      },
      Профессиональный_статус: {
        type: Sequelize.STRING
      },
      Образование: {
        type: Sequelize.STRING
      },
      Желаемая_сфера_деятельности: {
        type: Sequelize.STRING
      },
      Знание_иностранных_языков: {
        type: Sequelize.STRING
      },
      Наличие_опыта_супружеской_жизни: {
        type: Sequelize.STRING
      },
      Наличие_детей: {
        type: Sequelize.STRING
      },
      Пожелания_к_характеру: {
        type: Sequelize.STRING
      },
      Семейнобытовые_обязанности: {
        type: Sequelize.STRING
      },
      Важно_ли_Вам_что_бы_партнёр_готовил: {
        type: Sequelize.STRING
      }, 
      Увлечения_хобби: {
        type: Sequelize.STRING
      },
      Важно_ли_Вам_чтобы_партнёр_занимался_спортом: {
        type: Sequelize.STRING
      },
      Дополнительные_пожелания: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
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
    await queryInterface.dropTable('Wishes');
  }
};