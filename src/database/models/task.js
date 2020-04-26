'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    label: DataTypes.STRING,
    description: DataTypes.STRING,
    //parentId: DataTypes.INTEGER,
    priority: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    dateLine: DataTypes.DATE
  }, {});
  Task.associate = function (models) {
    // associations can be defined here , as: 'sub_tasks'
    Task.belongsTo(models.User , {
      as: 'user'
    });
    Task.hasMany(models.Task, {
      foreignKey: 'parentId',
      as: 'tasks',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return Task;
};