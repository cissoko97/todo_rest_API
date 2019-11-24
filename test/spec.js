var assert = require('assert');
var model = require('../models');
var db = require('../models/index')

before(function () {
    var env = process.env.NODE_ENV = 'test';
    const config = require(__dirname + '/../config/config.json')[env];
    // sequelize = new Sequelize(process.env[config.use_env_variable], config);
    db.sequelize = new db.Sequelize(env, config)

});

describe('Model persistance Test ', () => {
    describe('#UserRepository', () => {
        it('#Create()', () => {
        });
        it('#findAll()', () => {
        })
        it('#FindByEmailAndPass()', () => {
        })
    });

    describe('#TaskRepository', () => {
        it('#Create()', () => {
        });
        it('#findAll()', () => {
        })
        it('#FindByUserId()', () => {
        })
    });
});

after(() => {
    console.log('after run all test');
})