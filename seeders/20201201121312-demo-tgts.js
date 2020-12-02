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

    const result1 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: 'クリサリス美香' } });
    const result2 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '野田真美子' } });

    await sleep(1000);

    const pos1 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result1.id,
      },
    });
    console.log(pos1);

    const pos2 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result2.id,
      },
    });

    await sleep(1000);
    console.log(result2);

    return queryInterface.bulkInsert('tgts', [
      {
        postId: pos1.id, tgt: 'Exceptってアプリ使いやすいー', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos1.id, tgt: 'パクチーのないタイ料理屋発見', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos1.id, tgt: '目覚めが良かった', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos2.id, tgt: 'AWSの疎通が出来た', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos2.id, tgt: '本部の友達と久しぶりに会う', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos2.id, tgt: 'デモの日を無事迎えられた', seq: 3, createdAt: now, updatedAt: now,
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
