const db = require('../models/index');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const nowraw = new Date();
    const now = new Date(nowraw.getFullYear(), nowraw.getMonth(), nowraw.getDate());
    const days13ago = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 13,
      now.getHours(),
    );
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
    const result4 = await db.users.findOne({ raw: true, attributes: ['id'], where: { userName: '四郎' } });

    const pos1 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result1.id,
        date: now,
      },
    });
    const pos11 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result1.id,
        date: onedayago,
      },
    });
    const pos12 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result1.id,
        date: twodaysago,
      },
    });
    const pos2 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result2.id,
        date: now,
      },
    });
    const pos21 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result2.id,
        date: onedayago,
      },
    });
    const pos22 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result2.id,
        date: twelvedaysago,
      },
    });
    const pos3 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result3.id,
        date: onedayago,
      },
    });
    const pos31 = await db.posts.findOne({
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
        userId: result4.id,
        date: now,
      },
    });
    const pos41 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result4.id,
        date: onedayago,
      },
    });
    const pos42 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result4.id,
        date: twodaysago,
      },
    });
    const pos43 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result4.id,
        date: twelvedaysago,
      },
    });
    const pos44 = await db.posts.findOne({
      raw: true,
      attributes: ['id'],
      where: {
        userId: result4.id,
        date: days13ago,
      },
    });

    return queryInterface.bulkInsert('tgts', [
      {
        postId: pos1.id, tgt: '一郎のいいこと1-1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos1.id, tgt: '一郎のいいこと1-2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos1.id, tgt: '一郎のいいこと1-3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos11.id, tgt: '一郎のいいこと2-1', seq: 1, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        postId: pos11.id, tgt: '一郎のいいこと2-2', seq: 2, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        postId: pos11.id, tgt: '一郎のいいこと2-3', seq: 3, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        postId: pos12.id, tgt: '一郎のいいこと3-1', seq: 1, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos12.id, tgt: '一郎のいいこと3-2', seq: 2, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos12.id, tgt: '一郎のいいこと3-3', seq: 3, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos2.id, tgt: '二郎のいいこと1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos2.id, tgt: '二郎のいいこと2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos2.id, tgt: '二郎のいいこと3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos21.id, tgt: '二郎のいいこと1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos21.id, tgt: '二郎のいいこと2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos21.id, tgt: '二郎のいいこと3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos22.id, tgt: '二郎のいいこと1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos22.id, tgt: '二郎のいいこと2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos22.id, tgt: '二郎のいいこと3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos3.id, tgt: '三郎のいいこと1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos3.id, tgt: '三郎のいいこと2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos3.id, tgt: '三郎のいいこと3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos31.id, tgt: '三郎のいいこと2-1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos31.id, tgt: '三郎のいいこと2-2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos31.id, tgt: '三郎のいいこと2-3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos4.id, tgt: '4のいいこと1-1', seq: 1, createdAt: now, updatedAt: now,
      },
      {
        postId: pos4.id, tgt: '4のいいこと1-2', seq: 2, createdAt: now, updatedAt: now,
      },
      {
        postId: pos4.id, tgt: '4のいいこと1-3', seq: 3, createdAt: now, updatedAt: now,
      },
      {
        postId: pos41.id, tgt: '4のいいこと2-1', seq: 1, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        postId: pos41.id, tgt: '4のいいこと2-2', seq: 2, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        postId: pos41.id, tgt: '4のいいこと2-3', seq: 3, createdAt: onedayago, updatedAt: onedayago,
      },
      {
        postId: pos42.id, tgt: '4のいいこと3-1', seq: 1, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos42.id, tgt: '4のいいこと3-2', seq: 2, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos42.id, tgt: '4のいいこと3-3', seq: 3, createdAt: twodaysago, updatedAt: twodaysago,
      },
      {
        postId: pos43.id, tgt: '4のいいこと4-1', seq: 1, createdAt: twelvedaysago, updatedAt: twelvedaysago,
      },
      {
        postId: pos43.id, tgt: '4のいいこと4-2', seq: 2, createdAt: twelvedaysago, updatedAt: twelvedaysago,
      },
      {
        postId: pos43.id, tgt: '4のいいこと4-3', seq: 3, createdAt: twelvedaysago, updatedAt: twelvedaysago,
      },
      {
        postId: pos44.id, tgt: '4のいいこと5-1', seq: 1, createdAt: days13ago, updatedAt: days13ago,
      },
      {
        postId: pos44.id, tgt: '4のいいこと5-2', seq: 2, createdAt: days13ago, updatedAt: days13ago,
      },
      {
        postId: pos44.id, tgt: '4のいいこと5-3', seq: 3, createdAt: days13ago, updatedAt: days13ago,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('tgts', null, {}),
};
