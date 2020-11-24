const db = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nowraw = new Date();
    const now = new Date(nowraw.getFullYear(), nowraw.getMonth(), nowraw.getDate());
    const twelvedaysago = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 12,
      now.getHours(),
    );
    const twodaysago = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 2,
      now.getHours(),
    );
    const onedayago = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
      now.getHours(),
    );

    const result1 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '一郎' } });
    const result2 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '二郎' } });
    const result3 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '三郎' } });
    queryInterface.bulkInsert('posts', [
      {
        userId: result1.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result1.id, date: onedayago, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        userId: result1.id, date: twodaysago, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        userId: result2.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result2.id, date: onedayago, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        userId: result2.id, date: twelvedaysago, createdAt: twelvedaysago, updatedAt: twelvedaysago,
      },
      {
        userId: result3.id, date: onedayago, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        userId: result3.id, date: twodaysago, createdAt: twodaysago, updatedAt: twodaysago,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('posts', null, {}),
};
