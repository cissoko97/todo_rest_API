var assert = require('assert');
var models = require('../models');
const path = require('path');
var Sequelize = require('sequelize');
var db = require('../models/index')

var sequelize = null;
before(function () {
    var env = process.env.NODE_ENV = 'test';
    const config = require(__dirname + '/../config/config.json')[env];
    console.log('configuraton', config);
    console.log('environnement', env)
    sequelize = new Sequelize(config);//new Sequelize(env, config);
    sequelize.authenticate().then(() => {
        const basename = path.basename(__dirname);
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    sequelize.models = models;
    console.log(sequelize);
    sequelize.sync();
    // db.sequelize = 

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
    sequelize.close();
})