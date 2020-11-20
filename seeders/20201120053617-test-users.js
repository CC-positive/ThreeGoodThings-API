'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const now = new Date();
    // return queryInterface.bulkInsert('users', [
    //   { userName: '一郎',  token: 'hogetoken', googleId: 'hogegoogleid', createdAt: now, updatedAt: now},
    //   { userName: '二郎',  token: 'hogetoken', googleId: 'hogegoogleid', createdAt: now, updatedAt: now},
    //   { userName: '三郎',  token: 'hogetoken', googleId: 'hogegoogleid', createdAt: now, updatedAt: now}
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});  }
};
