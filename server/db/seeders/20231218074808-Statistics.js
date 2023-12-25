"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Statistics",
      [
        {
          userId: 1,
          points: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          points: 1800,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          points: 18000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Statistics", null, {});
  },
};
