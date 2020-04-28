'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('tasks', 'files', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
      after: 'dateline'
    }, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tasks', 'files', {});
  }
};
