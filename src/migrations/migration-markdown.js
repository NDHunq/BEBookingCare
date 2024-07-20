"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("markdowns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      contentMarkdown: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT("long"),
      },
      doctorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      clinicId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("markdowns");
  },
};
