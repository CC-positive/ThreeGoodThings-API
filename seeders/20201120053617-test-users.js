module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('users', [
      {
        userName: '一郎',
        picture: 'hogetoken',
        email: 'hoge@hoge.com',
        googleId: 'hogegoogleid1',
        createdAt: now,
        updatedAt: now,
      },
      {
        userName: '二郎',
        picture: 'hogetoken',
        email: 'fuga@fuga.com',
        googleId: 'hogegoogleid2',
        createdAt: now,
        updatedAt: now,
      },
      {
        userName: '三郎',
        picture: 'hogetoken',
        email: 'hogehoge@hogehoge.com',
        googleId: 'hogegoogleid3',
        createdAt: now,
        updatedAt: now,
      },
      {
        userName: '四郎',
        picture: 'hogetoken',
        email: 'fugafuga@fugafuga.com',
        googleId: 'hogegoogleid4',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
