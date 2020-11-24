"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert(
      "users",
      [
        {
          userName: "一郎",
          picture: "hogetoken",
          googleId: "hogegoogleid",
          createdAt: now,
          updatedAt: now,
        },
        {
          userName: "二郎",
          picture: "hogetoken",
          googleId: "hogegoogleid",
          createdAt: now,
          updatedAt: now,
        },
        {
          userName: "三郎",
          picture: "hogetoken",
          googleId: "hogegoogleid",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
