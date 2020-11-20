'use strict';
const db = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const now = new Date();
    // const ichiroId = "";
    // const jichiroId = "";
    // const sabuchiroId = "";

    // db.users
    // .findOne({
    //   attributes: ["id"],
    //   where: {
    //     userName:"一郎"
    //   },
    // })
    // .then((data) => {
    //   ichiroId = data.id
    // });      

    // db.users
    // .findOne({
    //   attributes: ["id"],
    //   where: {
    //     userName:"二郎"
    //   },
    // })
    // .then((data) => {
    //   jichiroId = data.id
    // });      

    // db.users
    // .findOne({
    //   attributes: ["id"],
    //   where: {
    //     userName:"三郎"
    //   },
    // })
    // .then((data) => {
    //   sabuchiroId = data.id
    // });      

    // return queryInterface.bulkInsert('posts', [
    //   { userId: '4a1f6310-1b15-4c10-8fd4-fd2140e8d03b',  date: now, createdAt: now, updatedAt: now},
    //   { userId: '4a1f6310-1b15-4c10-8fd4-fd2140e8d03b',  date: now, createdAt: now, updatedAt: now}
    // ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', null, {});
  }
};
