const { down } = require("./migration-create-user");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise.all([
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return new Promise.all([
      queryInterface.changeColumn("Users", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
