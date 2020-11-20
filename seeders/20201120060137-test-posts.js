'use strict';
const db = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    const ichiroId = "";
    const jichiroId = "";
    const sabuchiroId = "";

    db.users
    .findOne({
      attributes: ["id"],
      where: {
        userName:"一郎"
      },
    })
    .then((data) => {
      ichiroId = data.id
    });      

    db.users
    .findOne({
      attributes: ["id"],
      where: {
        userName:"二郎"
      },
    })
    .then((data) => {
      jichiroId = data.id
    });      

    db.users
    .findOne({
      attributes: ["id"],
      where: {
        userName:"三郎"
      },
    })
    .then((data) => {
      sabuchiroId = data.id
    });      

    return queryInterface.bulkInsert('posts', [
      { userId: '4049eed1-7e9f-4846-9726-2ee525729255',  date: now, createdAt: now, updatedAt: now},
      { userId: '4049eed1-7e9f-4846-9726-2ee525729255',  date: now, createdAt: now, updatedAt: now},
      { userId: '4049eed1-7e9f-4846-9726-2ee525729255',  date: now, createdAt: now, updatedAt: now},
      { userId: 'e7cd85ae-8d20-4990-9a76-ef91d4ece5f3',  date: now, createdAt: now, updatedAt: now},
      { userId: 'e7cd85ae-8d20-4990-9a76-ef91d4ece5f3',  date: now, createdAt: now, updatedAt: now},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};
