"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "Denis",
          email: "1@1",
          password: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "Sergey",
          email: "2@2",
          password: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: "Evgeniya",
          email: "3@3",
          password: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
