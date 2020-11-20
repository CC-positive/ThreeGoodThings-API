'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.posts, {foreignKey: 'id'});
    }
  };
  users.init({
    userName: DataTypes.STRING,
    token: DataTypes.STRING,
    googleId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};