//importation
var express = require('express');
var userController = require('./routes/UserController');
var taskController = require('./routes/TaskController');

exports.router = (function () {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register').post(userController.register);
    apiRouter.route('/users/login').post(userController.login);
    //apiRouter.route('/users/update').put(userController.update);
    apiRouter.route('/users/').get(userController.getUserProfile);
    //apiRouter.route('/users/logout').get(userController.logout);

    //Tasks Routes
    apiRouter.route('/tasks/new').post(taskController.createTask);
    apiRouter.route('/tasks/list').get(taskController.listTask);
    apiRouter.route('/tasks/').get(taskController.paginateTask)
    apiRouter.route('/tasks/update').put(taskController.updateTask);
    apiRouter.route('/tasks/lock').put(taskController.lockTask);

    apiRouter.route('/tasks/delete').delete(taskController.deleteTask);
    apiRouter.route('/tasks/:id/add/children').post(taskController.addChildTask)
    //Return router configuration
    return apiRouter;
})();
