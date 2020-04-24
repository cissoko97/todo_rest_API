//importation
var express = require('express');
const { checkAuthorization } = require('../middleware/authMiddleware')
var userController = require('../controllers/UserController');
var taskController = require('../controllers/TaskController');
// var { checkAuthorization } = require('./utils/jwt.utils')
exports.router = (function () {
    var apiRouter = express.Router();

    //Users routes for authentication
    apiRouter.route('/users/getProfile').get(checkAuthorization, userController.getUserProfile); //
    apiRouter.route('/users/new').post(userController.register);
    apiRouter.route('/users/login').post(userController.login);
    //Users routes for simple CRUD
    apiRouter.route('/users/:id').get(userController.getUserById);
    apiRouter.route('/users/').put(userController.update);
    apiRouter.route('/users/:id').delete(userController.delete);
    apiRouter.route('/users/').get(userController.list)
    //apiRouter.route('/users/logout').get(userController.logout);

    //Tasks routes for simple CRUD
    apiRouter.route('/tasks/new').post(checkAuthorization, taskController.createTask); // new task
    apiRouter.route('/tasks/list').get(checkAuthorization, taskController.listTask); //list task by authenticate user
    apiRouter.route('/tasks/').get(checkAuthorization, taskController.paginateTask) //paginate task by authenticate USer
    apiRouter.route('/tasks/update').put(checkAuthorization, taskController.updateTask); //Update Task 
    apiRouter.route('/tasks/lock').put(checkAuthorization, taskController.lockTask); //lock a task to make it finish
    apiRouter.route('/tasks/:id').get(checkAuthorization, taskController.getTaskById); // get Task By Id property
    apiRouter.route('/tasks/delete').delete(checkAuthorization, taskController.deleteTask); // delete task
    apiRouter.route('/tasks/:id/add/children').post(checkAuthorization, taskController.addChildTask) //add child task to parent.
    //Return router configuration
    return apiRouter;
})();
