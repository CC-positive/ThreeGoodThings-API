'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tgts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tgts.init({
    postId: DataTypes.STRING,
    tgt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tgts',
  });
  return tgts;
};