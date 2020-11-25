const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    static associate(models) {
      likes.belongsTo(models.users, { foreignKey: 'userId' });
      likes.belongsTo(models.tgts, { foreignKey: 'tgtId' });
    }
  }
  likes.init({
    tgtId: DataTypes.STRING,
    userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};
