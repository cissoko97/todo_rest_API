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
    apiRouter.route('/users/:id').get(checkAuthorization, userController.getUserById);
    apiRouter.route('/users/').put(checkAuthorization, userController.update);
    apiRouter.route('/users/:id').delete(checkAuthorization, userController.delete);
    apiRouter.route('/users/').get(checkAuthorization, userController.list)
    //apiRouter.route('/users/logout').get(userController.logout);

    //Tasks routes for simple CRUD
    apiRouter.route('/tasks/').post(checkAuthorization, taskController.createTask); // new task
    //apiRouter.route('/tasks/').get(checkAuthorization, taskController.listTask); // list task by authenticate user
    apiRouter.route('/tasks/').get(checkAuthorization, taskController.paginateTask) // paginate parent task for authenticate USer
    apiRouter.route('/tasks/:id').put(checkAuthorization, taskController.updateTask); // Update Task 
    apiRouter.route('/tasks/:id/lock').put(checkAuthorization, taskController.lockTask); // lock a task to make it finish
    apiRouter.route('/tasks/:id').get(checkAuthorization, taskController.getTaskById); // get child task By Id property
    apiRouter.route('/tasks/:id').delete(checkAuthorization, taskController.deleteTask); // delete task
    apiRouter.route('/tasks/:id/child').post(checkAuthorization, taskController.addChildTask) // add child task to parent.
    //Return router configuration
    return apiRouter;
})();
