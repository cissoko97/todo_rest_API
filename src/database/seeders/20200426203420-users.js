'use strict';
const bcrypt = require('bcrypt');
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = []
    let amount = 10;
    let date = new Date()
    while (amount--) {
      data.push({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password1234', 10),
        phone: faker.phone.phoneNumberFormat(),
        isadmin: faker.random.boolean(),
        createdAt: date,
        updatedAt: date
      })
    }
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkInsert('users', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
    return queryInterface.bulkDelete('users', null, {});
  }
};
