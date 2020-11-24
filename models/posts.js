const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.belongsTo(models.users, { foreignKey: 'userId' });
      posts.hasMany(models.tgts, { foreignKey: 'postId' });
    }
  }
  posts.init({
    userId: DataTypes.STRING,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};
