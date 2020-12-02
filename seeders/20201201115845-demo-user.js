module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('users',
      [{
        userName: 'クリサリス美香',
        picture: 'https://lh3.googleusercontent.com/a-/AOh14Gg2mnQrmjxYhAPFxhzpT7gFdNq1ZYVUe5BM95p_=s96-c',
        email: 'ccmikamika@gmail.com',
        googleId: '101142397342879570562',
        createdAt: now,
        updatedAt: now,
      }, {
        userName: '野田真美子',
        picture: 'https://lh4.googleusercontent.com/-iFR4Ky0RT4c/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnS9VwxpKQK7uNmmmtaq2XTKC1vOg/s96-c/photo.jpg',
        email: 'mamiko.noda3@gmail.com',
        googleId: '104579608407176775552',
        createdAt: now,
        updatedAt: now,
      }]);
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
