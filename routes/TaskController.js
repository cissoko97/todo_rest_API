//importation
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');

//Const
const TITLE_LIMIT_LENGTH = 7;
const DESCRIPTION_LIMIT_LENGTH = 15;
const PRIORITY_LIMIT_MAX = 5;
const PRIORITY_LIMIT_MIN = 0
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    createTask: function (req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //get Params
        var label = req.body.label;
        var description = req.body.description;
        var priority = parseInt(req.body.priority);
        var status = 0;
        console.log('req', req.body);
        //validation des parametres 
        if (label == null || description == null)
            return res.status(400).json({ 'error': 'missing parameters' })

        if (label.length < TITLE_LIMIT_LENGTH || description.length < DESCRIPTION_LIMIT_LENGTH)
            return res.status(400).json({ 'error': 'Invalid parameters' })
        if (priority > PRIORITY_LIMIT_MAX || priority < PRIORITY_LIMIT_MIN)
            return res.status(400).json({ 'error': 'Invalid parameters' })

        models.User.findOne({
            attributes: ['id', 'name'],
            where: { id: userId }
        }).then(userFound => {
            if (!userFound) {
                res.status(400).json({ 'error': 'user not found' });
            }

            models.Task.create({
                UserId: userFound.id,
                label: label,
                description: description,
                priority: priority,
                status: status
            }).then(task => {
                res.status(200).json(task);
            }).catch(err => {
                res.status(401).json({ 'error': 'Unable to create Task' });
            })
        }).catch(err => {
            res.status(500).json({ 'error': 'Unable to found User' })
        })
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    listTask: function (req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        models.Task.findAll({
            // attributes: ['id', 'name', '', ''],
            where: { userId: userId }
        }).then(tasks => {
            if (!tasks)
                return res.status(400).json({ 'error': 'not found task for user' })
            return res.status(200).json(tasks);
        }).catch(err => {
            res.status(500).json({ 'error': 'unable to fecth tasks for user' })
        })
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    lockTask: function (req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //getting params
        taskId = req.body.id;

        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                res.status(400).json({ 'error': 'Task not exist in DB' })
            }
            if (task.UserId != userId)
                res.status(404).json({ 'error': 'You are not avalaible to update this task' })
            task.update({
                status: 1,
            }).then(task => {
                res.status(201).json(task)
            }).catch(err => {
                res.status(500).json({ 'error': 'Cannot lock Task' })
            })
        }).catch(err => {
            res.status(500).json({ 'error': 'Unable to found Task' })
        })
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    deleteTask: function (req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //getting params
        taskId = req.body.id;
        //
        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                res.status(400).json({ 'error': 'task not exist in DB' });
            }
            if (task.UserId != userId) {
                res.status(404).json({ 'error': 'You are not ability to delete this task' })
            }

            task.destroy({
                where: { id: task.id }
            }).then(task => {
                console.log('response', JSON.stringify(task, null, 4))
                res.status(201).json({ 'success': 'operation success' })
            }).catch(err => {
                res.status(500).json({ 'error': 'Cannot delete Task' })
            });
        }).catch(err => {
            console.log('error', err)
            res.status(500).json({ 'error': 'Unable to found Task' })
        });
    },

    /**
     * 
     * @param {*} req
     * @param {*} res 
     */
    updateTask: function (req, res) {
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        let param = {};
        //getting params
        taskId = req.body.id;
        param.label = req.body.label;
        param.description = req.body.description;
        param.priority = parseInt(req.body.priority);
        param.status = req.body.status;

        if (param.label == null || param.description == null)
            return res.status(400).json({ 'error': 'missing parameters' })

        if (param.label.length < TITLE_LIMIT_LENGTH || param.description.length < DESCRIPTION_LIMIT_LENGTH)
            return res.status(400).json({ 'error': 'Invalid parameters' })

        if (param.priority > PRIORITY_LIMIT_MAX || param.priority < PRIORITY_LIMIT_MIN)
            return res.status(400).json({ 'error': 'Invalid parameters' })

        if (param.status != 0 && param.status != 1)
            return res.status(400).json({ 'error': 'Invalid parameters' })

        models.Task.findOne({
            where: { id: taskId }
        }).then(task => {
            if (!task) {
                res.status(400).json({ 'error': 'task not exist in DB' });
            }
            if (task.UserId != userId) {
                res.status(404).json({ 'error': 'You are not ability to update this task' })
            }

            task.update({
                label: param.label,
                description: param.description,
                priority: param.priority,
                status: param.status
            }).then(task => {
                console.log(task)
                res.status(201).json(task)
            }).catch(err => {
                res.status(500).json({ 'error': 'Cannot update Task' })
            });
        }).catch(err => {
            res.status(500).json({ 'error': 'Unable to found Task' })
        });
    },

    paginateTask: function (req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        models.Task.findAll({
            order: [(order != null) ? order.split(':') : ['label', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : 5,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['name', 'email']
            }]
        }).then(tasks => {
            if (tasks)
                return res.status(200).json({ tasks });
            else
                return res.status(404).json({ 'error': 'tasks not found' })
        }).catch(err => {
            return res.status(500).json({ 'error': 'invalid fields' })
        })
    }

}