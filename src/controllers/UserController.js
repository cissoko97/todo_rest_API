//importation des paquets
const bcrypt = require('bcrypt');
const models = require('../database/models');
const jwtUtils = require('../utils/jwt.utils');
const MAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;
const TAG = 'USERCONTROLLER';

module.exports = {
    /**
     *
     * @param {*} req
     * @param {*} res
     */

    register: function (req, res) {
        console.log(TAG, `Register function`);
        //params
        var user = {}
        user.isadmin = 0;
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phone = req.body.phone;
        console.log(TAG, JSON.stringify(user, null, 4));
        console.log(TAG + ' Body', JSON.stringify(req.body, null, 4));

        if (user.name == null || user.email == null || user.password == null || user.phone == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        if (!PASSWORD_REGEX) {
            return res.status(400).json({ 'error': 'Incorrect value for password' })
        }

        if (!MAIL_REGEX) {
            return res.status(400).json({ 'error': 'Incorrect value for email' })
        }

        if (user.name.length <= 4 || user.name.length >= 15) {
            return res.status(400).json({ 'error': 'wrong name (most be length 5 - 14)' })
        }
        models.User
            .findOne({
                attributes: ['email'],
                where: { email: user.email }
            })
            .then(userfound => {
                if (!userfound) {
                    bcrypt.hash(user.password, 5).then(hasher => {
                        user.password = hasher;
                        models.User.create(user).then(newuser => {
                            return res.status(201).json({ ...newuser.dataValues });
                        }).catch(err => {
                            return res.status(500).json({ 'error': 'cannot add user' });
                        })
                    }).catch(error => {
                        return res.status(500).json({ 'error': 'bcrypt error  ' });
                    })
                } else {
                    return res.status(409).json({ 'error': 'user already exist' });
                }
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({ 'error': 'unable to verify user' });
            });
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    login: function (req, res) {
        var user = {};
        user.email = req.body.email;
        user.password = req.body.password;
        console.log(req.body);
        if (user.email == null || user.password == null) {
            return res.status(400).json({ 'error': 'missing parameters' })
        }
        models.User.findOne({
            where: { email: user.email }
        }).then(userfound => {
            if (userfound) {
                bcrypt.compare(user.password, userfound.password).then(same => {
                    if (same) {
                        return res.status(200).json({
                            'userId': userfound.id,
                            'token': jwtUtils.generateTokenForUser(userfound)
                        });
                    } else {
                        return res.status(403).json({ 'error': 'Incorrect password in comparaison' });
                    }
                }).catch(err => {
                    res.status(500).json({ 'error': 'Incorrect password' });
                })
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' })
            }
        }).catch(err => {
            return res.status(500).json({ 'error': 'enable to verify user' })
        })
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    update: function (req, res) {
        console.log(TAG, `update function`);
        return new Error('not implemented methods');
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    getUserProfile: function (req, res) {
        var userId = req.userId;
        models.User.findOne({
            attributes: ['id', 'name', 'email', 'phone', 'isadmin', 'createdAt'],
            where: { id: userId }
        }).then(user => {
            if (user) {
                return res.status(201).json({ ...user.dataValues });
            } else {
                return res.status(404).json({ 'error': 'user not found' })
            }
        }).catch(err => {
            res.status(500).json({ 'error': 'cannot fetch user' })
        })
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    getUserById: function (req, res) {
        return new Error('not implemented methods');
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    list: function (req, res) {
        return new Error('not implemented methods');
    },

    /**
     *
     * @param {*} req
     * @param {*} res
     */
    delete: function (req, res) {
        return new Error('not implemented methods')
    }
}
