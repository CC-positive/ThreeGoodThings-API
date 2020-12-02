const userTest = require('../seedjs/user_test.js');

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    userTest),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
