const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tgts extends Model {
    static associate(models) {
      tgts.belongsTo(models.posts, { foreignKey: 'postId' });
      tgts.hasMany(models.likes, { foreignKey: 'tgtId' });
    }
  }
  tgts.init({
    postId: DataTypes.STRING,
    tgt: DataTypes.STRING,
    seq: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'tgts',
  });
  return tgts;
};
