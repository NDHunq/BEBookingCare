'use strict';
// email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     address: DataTypes.STRING,
//     phonenumber: DataTypes.STRING,
//     gender: DataTypes.BOOLEAN,
//     roleid: DataTypes.STRING
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Duy',
        lastName: 'Hung',
        email: 'hung07092004@gmail.com',
        password: '123456',
        address: 'Hanoi',
        phoneNumber: '0987654321',
        gender: 1,
        typeRole: 'ROLE',
        keyRole: 'R1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
