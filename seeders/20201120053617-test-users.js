module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('users', [
      {
        userName: '一郎',
        picture: 'hogetoken',
        googleId: 'hogegoogleid1',
        createdAt: now,
        updatedAt: now,
      },
      {
        userName: '二郎',
        picture: 'hogetoken',
        googleId: 'hogegoogleid2',
        createdAt: now,
        updatedAt: now,
      },
      {
        userName: '三郎',
        picture: 'hogetoken',
        googleId: 'hogegoogleid3',
        createdAt: now,
        updatedAt: now,
      },
      {
        userName: '四郎',
        picture: 'hogetoken',
        googleId: 'hogegoogleid4',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
