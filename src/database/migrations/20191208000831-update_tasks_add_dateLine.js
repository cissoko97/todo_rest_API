'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.addColumns('tasks','dateLine', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('tasks', 'dateLine', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      after: 'status'
    }, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tasks', 'dateLine', {});
  }
};
