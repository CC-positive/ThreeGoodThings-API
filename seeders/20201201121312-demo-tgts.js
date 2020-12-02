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

    const pos3 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result3.id,
        date: twodaysago,
      },
    });

    const pos4 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result3.id,
        date: threedaysago,
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
      {
        postId: pos3.id, tgt: '猫に癒された', seq: 1, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos3.id, tgt: '犬にも癒された', seq: 2, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos3.id, tgt: 'ゴリラの魅力を再発見した', seq: 3, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos4.id, tgt: 'UIいい感じ', seq: 1, createdAt: threedaysago, updatedAt: threedaysago,
      },
      {
        postId: pos4.id, tgt: 'React使いこなせる', seq: 2, createdAt: threedaysago, updatedAt: threedaysago,
      },
      {
        postId: pos4.id, tgt: '研修楽しい', seq: 3, createdAt: threedaysago, updatedAt: threedaysago,
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
