var assert = require('assert');
const User = require('./../models/User');
const Task = require('./../models/Task');

before(function () {
    User.sync({ force: true });
    Task.sync({ force: true });
    console.error(`Before each test`);
});

describe('Test_suite', function () {
    describe('#UserRepository', function () {
        it('#Create()', function () {
            //UserRepository.create().then()
        });
        it('#findAll()', function () {
            var results = UserRepository.findAll();
            user = results.then(users => {
                console.log('All users :', JSON.stringify(users, null, 3));
            }, err => {
                console.error(err)
            });
        })
        it('#FindByEmailAndPass()', function () {
            UserRepository.findByEmailAndPass('boriscissoko@gmail.com', 'boris')
                .then(user => {
                    console.log('User Email and Password: ', JSON.stringify(user, null, 3));
                }).catch(err => {
                    console.error(err);
                })
        })
    });
});