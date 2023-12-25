"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "JavaScript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Кино",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Космос",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Спорт",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Еда",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
