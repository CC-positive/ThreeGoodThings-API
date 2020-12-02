const db = require('../models/index');

// sleep関数
function sleep(msec) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(); }, msec);
  });
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nowraw = new Date();
    const now = new Date(nowraw.getFullYear(), nowraw.getMonth(), nowraw.getDate());
    const twodaysago = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 2,
      now.getHours(),
    );
    const threedaysago = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 3,
      now.getHours(),
    );

    const result1 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: 'クリサリス美香' } });
    const result2 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '野田真美子' } });
    const result3 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '北村大成' } });

    await sleep(1000);

    queryInterface.bulkInsert('posts', [
      {
        userId: result1.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result2.id, date: now, createdAt: now, updatedAt: now,
      },
      {
        userId: result3.id, date: threedaysago, createdAt: threedaysago, updatedAt: threedaysago,
      },
      {
        userId: result3.id, date: twodaysago, createdAt: twodaysago, updatedAt: twodaysago,
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
