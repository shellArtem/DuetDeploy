'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Anketa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Фамилия: {
        type: Sequelize.STRING
      },
      Имя: {
        type: Sequelize.STRING
      },
      Отчество: {
        type: Sequelize.STRING
      },
      Контактный_телефон: {
        type: Sequelize.STRING
      },
      еmail: {
        type: Sequelize.STRING
      },
      Дата_рождения: {
        type: Sequelize.STRING
      },
      Полных_лет: {
        type: Sequelize.STRING
      },
      Знак_Зодиака: {
        type: Sequelize.STRING
      },
      Национальность: {
        type: Sequelize.STRING
      },
      Пол: {
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
      Цвет_глаз: {
        type: Sequelize.STRING
      },
      Цвет_волос: {
        type: Sequelize.STRING
      },
      Длина_волос: {
        type: Sequelize.STRING
      },
      Общее_состояние_здоровья: {
        type: Sequelize.STRING
      },
      Вредные_привычки: {
        type: Sequelize.STRING
      },
      Место_жительства: {
        type: Sequelize.STRING
      },
      Жилищные_условия: {
        type: Sequelize.STRING
      },
      С_кем_проживаете: {
        type: Sequelize.STRING
      },
      Материальное_положение: {
        type: Sequelize.STRING
      },
      Наличие_автомобиля: {
        type: Sequelize.STRING
      },
      Водительское_удостоверение: {
        type: Sequelize.STRING
      },
      Образование: {
        type: Sequelize.STRING
      },
      Специальность: {
        type: Sequelize.STRING
      },
      Знание_иностранных_языков: {
        type: Sequelize.STRING
      },
      Сфера_деятельности_в_настоящее_время: {
        type: Sequelize.STRING
      },
      Должность: {
        type: Sequelize.STRING
      },
      Семейное_положение: {
        type: Sequelize.STRING
      },
      Ранее_были_замужем_или_женаты: {
        type: Sequelize.STRING
      },
      Наличие_детей: {
        type: Sequelize.STRING
      },
      Пол_детей: {
        type: Sequelize.STRING
      },
      Возраст_детей: {
        type: Sequelize.STRING
      },
      Опишите_кратко_свой_характер: {
        type: Sequelize.STRING
      },
      Верите_ли_вы_в_любовь_с_первого_взгляда: {
        type: Sequelize.STRING
      },
      Привлекались_ли_вы_к_уголовной_ответственности: {
        type: Sequelize.STRING
      },
      Готовы_ли_вы_к_переменам: {
        type: Sequelize.STRING
      },
      Какие_качества_вы_цените_в_людях: {
        type: Sequelize.STRING
      },
      Любите_ли_вы_делать_сюрпризы: {
        type: Sequelize.STRING
      },
      Ваши_достоинства_и_недостатки: {
        type: Sequelize.STRING
      },
      Семейнобытовые_обязанности: {
        type: Sequelize.STRING
      },
      Предпочтения_в_еде: {
        type: Sequelize.STRING
      },
      Умеете_и_любите_ли_вы_готовить: {
        type: Sequelize.STRING
      },
      Увлечения_хобби: {
        type: Sequelize.STRING
      },
      Вы_романтик: {
        type: Sequelize.STRING
      },
      Были_ли_в_вашей_жизни_необычные_свидания: {
        type: Sequelize.STRING
      },
      Занимаетесь_ли_вы_спортом: {
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
    await queryInterface.dropTable('Anketa');
  }
};