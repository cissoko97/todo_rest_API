'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    faker.locale = 'fr'
    let data = [];
    let amount = 20;
    let date = new Date();
    while (amount--) {
      data.push({
        userId: faker.random.number({ min: 1, max: 10 }),
        parentId: null,
        label: faker.lorem.word(),
        description: faker.lorem.sentence(),
        priority: faker.random.number({ min: 1, max: 5 }),
        status: faker.random.boolean(),
        dateLine: faker.date.future(),
        createdAt: date,
        updatedAt: date
      })
    }
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('tasks', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
