'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tgts', [
      { postId: '4049eed1-7e9f-4846-9726-2ee525729255',  date: now, createdAt: now, updatedAt: now},
      { postId: '4049eed1-7e9f-4846-9726-2ee525729255',  date: now, createdAt: now, updatedAt: now},
      { postId: '4049eed1-7e9f-4846-9726-2ee525729255',  date: now, createdAt: now, updatedAt: now},
      { postId: 'e7cd85ae-8d20-4990-9a76-ef91d4ece5f3',  date: now, createdAt: now, updatedAt: now},
      { postId: 'e7cd85ae-8d20-4990-9a76-ef91d4ece5f3',  date: now, createdAt: now, updatedAt: now},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
  }
};
