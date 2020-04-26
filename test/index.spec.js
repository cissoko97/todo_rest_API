var assert = require('assert');
var Sequelize = require('sequelize');
var models = require('../src/database/models');
const path = require('path');

var sequelize = null;
before(() => {
    const config = require('../src/database/config/config.json')['test'];
    sequelize = new Sequelize(config);
    console.dir(sequelize);
});

describe('Model persistance Test ', () => {
    describe('#UserRepository', () => {
        test('#Create()', () => {

        });
        it('#findAll()', () => {

        })
        it('#FindByEmailAndPass()', () => {
        })
    });
})

after(() => {
    sequelize.close();
})
