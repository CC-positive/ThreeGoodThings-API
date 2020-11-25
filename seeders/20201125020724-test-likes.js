const db = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nowraw = new Date();
    const now = new Date(nowraw.getFullYear(), nowraw.getMonth(), nowraw.getDate());

    const resultTgt1 = await db.tgts.findOne({ raw: true, attributes: ['id'], where: { tgt: '一郎のいいこと1-1' } });
    const resultUser1 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '一郎' } });
    const resultUser2 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '二郎' } });

    const resultTgt2 = await db.tgts.findOne({ raw: true, attributes: ['id'], where: { tgt: '一郎のいいこと1-2' } });

    return queryInterface.bulkInsert('likes', [
      {
        tgtId: resultTgt1.id, userId: resultUser1.id, createdAt: now, updatedAt: now,
      },
      {
        tgtId: resultTgt1.id, userId: resultUser2.id, createdAt: now, updatedAt: now,
      },
      {
        tgtId: resultTgt2.id, userId: resultUser2.id, createdAt: now, updatedAt: now,
      },
      {
        tgtId: resultTgt2.id, userId: resultUser2.id, createdAt: now, updatedAt: now,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('likes', null, {}),
};
