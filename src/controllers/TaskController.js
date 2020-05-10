//importation
const jwtUtils = require('../utils/jwt.utils');
const models = require('../database/models');
const { Op } = require('sequelize');


//Declaration des constantes utilisée dans le controller
module.exports = {
    /**
     * create a new task for a user
     * @param {*} req
     * @param {*} res
     */
    createTask: function (req, res) {
        /**
         * @TODO
         */
        //getting authanticate user provided in the header
        var userId = req.userId
        //get Params
        var label = req.body.label;
        var description = req.body.description;
        var dateLine = new Date(req.body.dateline);
        var priority = parseInt(req.body.priority);
        var status = 0;

        //TODO test if dateLine is valide (not before date of that day)
        models.User.findOne({
            attributes: ['id', 'name'],
            where: { id: userId }
        }).then(userFound => {
            if (!userFound) {
                return res.status(400).json({ 'error': 'user not found' });
            }

            models.Task.create({
                UserId: userFound.id,
                label: label,
                description: description,
                priority: priority,
                status: status,
                dateLine: dateLine
            }).then(task => {
                return res.status(201).json({ ...task.dataValues });
            }).catch(err => {
                return res.status(401).json({ 'error': 'Unable to create Task' });
            })
        }).catch(err => {
            return res.status(500).json({ 'error': 'Unable to found User' })
        })
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    listTask: function (req, res) {
        userId = req.userId;
        models.Task.findAll({
            // attributes: ['id', 'label', 'description', 'priority'],
            where: { userId, parentId: null }
        }).then(tasks => {
            return res.status(200).json(tasks);
        }).catch(err => {
            return res.status(500).json({ 'error': 'unable to fecth tasks for user' })
        })
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    lockTask: function (req, res) {
        /**
         * @TODO
         */
        //getting auth header

        var userId = req.userId;

        //getting params
        taskId = req.params.id;

        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                return res.status(400).json({ 'error': 'Task not exist in DB' })
            }
            if (task.UserId != userId)
                return res.status(401).json({ 'error': 'You are not avalaible to lock this task' })
            return task.update({
                status: 1,
            }).then(taskLock => {
                return res.status(204).json(taskLock)
            }).catch(err => {
                return res.status(500).json({ 'error': 'Cannot lock Task' })
            })
        }).catch(err => {
            return res.status(500).json({ 'error': 'Unable to found Task' })
        })
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    deleteTask: function (req, res) {
        /**
         * @TODO
         */
        //getting auth header

        var userId = req.userId;

        //getting params
        taskId = req.params.id;
        console.log('taskId', taskId);
        //
        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                return res.status(404).json({ 'error': 'task not exist in DB' });
            }
            if (task.UserId != userId) {
                return res.status(401).json({ 'error': 'You are not ability to delete this task' })
            }

            return task.destroy({
                where: { id: task.id }
            }).then(task => {
                return res.status(204).json({ 'success': 'operation success' })
            }).catch(err => {
                console.error(err)
                return res.status(500).json({ 'error': 'Cannot delete Task' })
            });
        }).catch(err => {
            console.log('error', err)
            return res.status(500).json({ 'error': 'Unable to found Task' })
        });
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    updateTask: function (req, res) {
        /**
         * @TODO
         */
        var userId = req.userId
        let param = {};
        //getting params
        taskId = req.params.id;
        if (req.body.label) {
            param.label = req.body.label
        }
        if (req.body.description) {
            param.description = req.body.description;
        }
        if (req.body.priority) {
            param.priority = parseInt(req.body.priority);
        }
        if (req.body.dateline) {
            param.dateLine = new Date(req.body.dateLine);
        }
        if (req.body.status) {
            param.status = req.body.status;
        }

        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                return res.status(400).json({ 'error': 'task not exist in DB' });
            }
            if (task.UserId != userId) {
                return res.status(401).json({ 'error': 'You are not ability to update this task' })
            }

            return task.update({
                label: param.label,
                description: param.description,
                priority: param.priority,
                status: param.status
            }).then(update => {
                return res.status(204).json();
            }).catch(err => {
                return res.status(500).json({ 'error': 'Cannot update Task' })
            });
        }).catch(err => {
            return res.status(500).json({ 'error': 'Unable to found Task' })
        });
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    paginateTask: function (req, res) {
        /**
         * @TODO
         */
        const TAG = 'paginateTask';
        console.log('TaskController', req.query)
        //getting auth header

        var userId = req.userId;

        //get params to send on DB
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        Op.and
        models.Task.findAndCountAll({
            //['createAt', 'ASC'], ['priority', 'DESC']
            order: [(order != null) ? order.split(';').map(value => value.split(':')) : ['id', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            where: {
                [Op.and]: {
                    parentId: null,
                    userId
                }
            },
            include: [
                // {
                //     model: models.User,
                //     attributes: ['name', 'email'],
                //     as: 'user'
                // },
                {
                    model: models.Task,
                    attributes: ['id', 'label', 'description', 'dateLine', 'priority', 'status'],
                    as: 'tasks'
                }]
        }).then(tasks => {
            // console.log(tasks)
            let leftData = (tasks.count - (limit + offset));
            let left = Math.sign(leftData) === -1 ? 0 : leftData;
            let currentPage = (offset / limit) + 1
            return res.status(200).json({
                pages: Math.round(tasks.count / limit),
                currentPage,
                size: tasks.count,
                previous: (currentPage === 1) ? null : currentPage - 1,
                next: (left === 0) ? null : currentPage + 1,
                left,
                data: tasks.rows
            });
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ 'error': 'invalid fields' })
        })
    },

    /**
     * @TODO add child task to parent task
     * @param {*} req
     * @param {*} res
     */
    addChildTask: function (req, res) {
        /**
         * @TODO add child task to parent task
         * TODO check if user is valid
         * test if task is present and is not lock
         * if all test are Ok make add of child task and redirect back je vous aimes bien je ne sais pas enore
         */

        //getting auth header

        var userId = req.userId

        //get Parameter from req.body

        var label = req.body.label;
        var description = req.body.description;
        var dateLine = new Date(req.body.dateline);
        var priority = parseInt(req.body.priority);
        var status = 0;

        //get id task paramater
        var parentId = req.params.id;
        console.log('Parent Id ', parentId);

        //Control parameter

        if (label == null || description == null)
            return res.status(400).json({ 'error': 'missing parameters' })
        if (label.length < TITLE_LIMIT_LENGTH || description.length < DESCRIPTION_LIMIT_LENGTH)
            return res.status(400).json({ 'error': 'Invalid parameters' })
        if (priority > PRIORITY_LIMIT_MAX || priority < PRIORITY_LIMIT_MIN)
            return res.status(400).json({ 'error': 'Invalid parameters' })


        models.Task.findOne({
            where: { id: parentId }
        }).then(task => {
            if (!task) {
                return res.status(404).json({ 'error': 'tasks not found' })
            }
            if (task.status) {
                return res.status(403).json({ 'error': 'forbidden access' })
            }
            if (task.UserId != userId) {
                return res.status(403).json({ 'error': 'forbidden access' })
            }
            return models.Task.create({
                UserId: userId,
                parentId: task.id,
                label: label,
                description: description,
                priority: priority,
                status: status,
                dateLine: dateLine
            }).then(newTask => {
                return res.status(201).json(newTask)
            }).catch(err => {
                return res.status(401).json({ 'error': 'Unable to create Task' });
            });
        }).catch(err => {
            return res.status(404).json({ 'error': 'tasks not found' })
        })
    },

    getTaskById: function (req, res) {
        const TAG = 'getTaskById';
        //getting auth header
        var userId = req.userId

        var id = req.params.id;
        models.Task;
        models.Task.findAll({
            where: {
                parentId: id,
                userId: userId
            }
        }).then(tasks => {
            console.table(tasks);
            return res.status(201).json({ tasks });
        }).catch(err => {
            return res.status(500).json({ err })
        });

    },
    attachFiles: (req, res) => {
        const userId = req.userId;
        const taskId = req.params.id;
        const files = JSON.stringify(req.files.map(value => value.filename));
        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                return res.status(400).json({ 'error': 'task not exist in DB' });
            }
            if (task.UserId != userId) {
                return res.status(401).json({ 'error': 'You are not ability to update this task' })
            }

            return task.update({
                files
            }).then(update => {
                return res.status(204).json(update);
            }).catch(err => {
                return res.status(500).json({ 'error': 'Cannot update Task' })
            });
        }).catch(err => {
            return res.status(500).json({ 'error': 'Unable to found Task' })
        });
    }
}