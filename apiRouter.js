//importation
var express = require('express');
var userController = require('./routes/UserController');
var taskController = require('./routes/TaskController');

exports.router = (function () {
    var apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/new').post(userController.register);
    apiRouter.route('/users/login').post(userController.login);
    //apiRouter.route('/users/update').put(userController.update);
    apiRouter.route('/users/').get(userController.getUserProfile);
    //apiRouter.route('/users/logout').get(userController.logout);

    //Tasks Routes
    apiRouter.route('/tasks/new').post(taskController.createTask); // new task
    apiRouter.route('/tasks/list').get(taskController.listTask); //list task by authenticate user
    apiRouter.route('/tasks/').get(taskController.paginateTask) //paginate task by authenticate USer
    apiRouter.route('/tasks/update').put(taskController.updateTask); //Update Task 
    apiRouter.route('/tasks/lock').put(taskController.lockTask); //lock a task to make it finish
    apiRouter.route('/tasks/:id').get(taskController.getTaskById); // get Task By Id property
    apiRouter.route('/tasks/delete').delete(taskController.deleteTask); // delete task
    apiRouter.route('/tasks/:id/add/children').post(taskController.addChildTask) //add child task to parent.
    //Return router configuration
    return apiRouter;
})();
