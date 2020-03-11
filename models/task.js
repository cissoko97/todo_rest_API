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
    // associations can be defined here
    Task.belongsTo(models.User);
    Task.hasMany(models.Task, { foreignKey: 'parentId', as: 'sub_tasks', onDelete: 'CASCADE', hooks: true });
  };
  return Task;
};