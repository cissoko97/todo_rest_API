'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    label: DataTypes.STRING,
    description: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User);
  };
  return Task;
};