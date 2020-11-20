'use strict';
const db = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    const result1 = await db.users.findOne({raw: true, attributes: ["id"],where: {userName:"一郎"}});
    const result2 = await db.users.findOne({raw: true, attributes: ["id"],where: {userName:"二郎"}});
    const result3 = await db.users.findOne({raw: true, attributes: ["id"],where: {userName:"三郎"}});

    const pos1 = await db.posts.findOne({raw: true, attributes: ["id"],where: {userId: result1.id}});
    const pos2 = await db.posts.findOne({raw: true, attributes: ["id"],where: {userId: result2.id}});
    const pos3 = await db.posts.findOne({raw: true, attributes: ["id"],where: {userId: result3.id}});


    return queryInterface.bulkInsert('tgts', [
      {postId: pos1.id,  tgt: '一郎のいいこと1', seq: 1 , createdAt: now, updatedAt: now},
      {postId: pos1.id,  tgt: '一郎のいいこと2', seq: 2 , createdAt: now, updatedAt: now},
      {postId: pos1.id,  tgt: '一郎のいいこと3', seq: 3 , createdAt: now, updatedAt: now},
      {postId: pos2.id,  tgt: '二郎のいいこと1', seq: 1 , createdAt: now, updatedAt: now},
      {postId: pos2.id,  tgt: '二郎のいいこと2', seq: 2 , createdAt: now, updatedAt: now},
      {postId: pos2.id,  tgt: '二郎のいいこと3', seq: 3 , createdAt: now, updatedAt: now},
      {postId: pos3.id,  tgt: '三郎のいいこと1', seq: 1 , createdAt: now, updatedAt: now},
      {postId: pos3.id,  tgt: '三郎のいいこと2', seq: 2 , createdAt: now, updatedAt: now},
      {postId: pos3.id,  tgt: '三郎のいいこと3', seq: 3 , createdAt: now, updatedAt: now}
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tgts', null, {});
  }
};
