'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users', 'picture', {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: [],
      after: 'isadmin'
    }, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'picture', {});
  }
};
