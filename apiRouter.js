//importation 
var express = require('express');
var userController = require('./routes/UserController');
var taskController = require('./routes/TaskController');

exports.router = (function () {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register').post(userController.register);
    apiRouter.route('/users/login').post(userController.login);
    apiRouter.route('/users/update').put(userController.update);
    //apiRouter.route('/users/logout').get(userController.logout);

    //Tasks Routes
    //apiRouter.route('/tasks/save').post(taskController.save);
    //apiRouter.route('/tasks/delete/:id').get(taskController.delete);
    //apiRouter.route('/tasks/update').get(taskController.update);

    //Return router configuration
    return apiRouter;
})();