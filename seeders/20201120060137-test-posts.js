const db = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const result1 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '一郎' } });
    const result2 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '二郎' } });
    const result3 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '三郎' } });
    queryInterface.bulkInsert('posts', [
      {
        userId: result1.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result2.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result3.id, date: now, createdAt: now, updatedAt: now,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('posts', null, {}),
};
