//importation
const apiRoutes = require('express').Router();
const { upload } = require('../utils/uploadconfig')
const { checkAuthorization } = require('../middleware/tokenMiddleware');
const { createTaskValidator, updateTaskValidator } = require('../middleware/taskValidator');
const { authRegistrationValidator, authLoginValidator } = require('../middleware/authValidator');
const userController = require('../controllers/UserController');
const taskController = require('../controllers/TaskController');
// var { checkAuthorization } = require('./utils/jwt.utils')

//Users routes for authentication
apiRoutes.route('/users/getProfile').get(checkAuthorization, userController.getUserProfile); //
apiRoutes.route('/users/new').post(upload.single('avatar'), authRegistrationValidator, userController.register);
apiRoutes.route('/users/login').post(authLoginValidator, userController.login);
//Users routes for simple CRUD
apiRoutes.route('/users/:id').get(checkAuthorization, userController.getUserById);
apiRoutes.route('/users/').put(checkAuthorization, userController.update);
apiRoutes.route('/users/:id').delete(checkAuthorization, userController.delete);
apiRoutes.route('/users/').get(checkAuthorization, userController.list)
//apiRoutes.route('/users/logout').get(userController.logout);

//Tasks routes for simple CRUD
apiRoutes.route('/tasks/').post(checkAuthorization, createTaskValidator, taskController.createTask); // new task
//apiRoutes.route('/tasks/').get(checkAuthorization, taskController.listTask); // list task by authenticate user
apiRoutes.route('/tasks/').get(checkAuthorization, taskController.paginateTask) // paginate parent task for authenticate USer
apiRoutes.route('/tasks/:id').put(checkAuthorization, updateTaskValidator, taskController.updateTask); // Update Task 
apiRoutes.route('/tasks/:id/lock').put(checkAuthorization, taskController.lockTask); // lock a task to make it finish
apiRoutes.route('/tasks/:id').get(checkAuthorization, taskController.getTaskById); // get child task By Id property
apiRoutes.route('/tasks/:id').delete(checkAuthorization, taskController.deleteTask); // delete task
apiRoutes.route('/tasks/:id/child').post(checkAuthorization, taskController.addChildTask) // add child task to parent.
apiRoutes.route('/tasks/:id/files').post(checkAuthorization, upload.array('files', 4), taskController.attachFiles) // add child task to parent.
module.exports = { apiRoutes };