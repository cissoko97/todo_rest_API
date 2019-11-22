//importation
var jwtUtils = require('../utils/jwt.utils')
var models = require('../models');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    createTask: function (req , res){
        //getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        
        //get Params
        var label = req.body.label;
        var description =  req.body.description;
        var priority = req.body.priority;
        var status =  req.body.status;

        //validation des parametres 
        if(label == null || description ==null)
            res.status(400).json({'error':'missing parameters'})
         
        if(title.length < 7 || description.length<4)
    },
    listTask:function (req , res){
        
    }
}