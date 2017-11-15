var express = require('express');
// allow us to break our routes out into little modular chunks and require them back in our main index.js as our main app file and require them here
var router = express.Router();
// if we point to the models folder it will automatically include the index file which has all this code in it. 
var db = require("../models");


router.get('/', function(req, res){
    //get all todos in the mongo database
    db.Todo.find()
    .then(function(todos){
        // almost the same as res.send, print the todos data as json
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    }) 
});

module.exports = router;
