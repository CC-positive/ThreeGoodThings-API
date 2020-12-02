const db = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nowraw = new Date();
    const now = new Date(nowraw.getFullYear(), nowraw.getMonth(), nowraw.getDate());

    const result1 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: 'クリサリス美香' } });
    const result2 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '野田真美子' } });
    queryInterface.bulkInsert('posts', [
      {
        userId: result1.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result2.id, date: now, createdAt: now, updatedAt: now,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
