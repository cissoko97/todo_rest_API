'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    isadmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: 'UserId'
    });
  };
  return User;
};