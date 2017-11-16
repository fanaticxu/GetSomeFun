var express = require('express');
// allow us to break our routes out into little modular chunks and require them back in our main index.js as our main app file and require them here
var router = express.Router();
// if we point to the models folder it will automatically include the index file which has all this code in it. 
var db = require("../models");
var helpers = require('../helpers/todos');


// router.get('/', );
// router.post('/', );
// above code can be convert to below syntax:
router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodos)

router.route('/:todoId')
.get(helpers.showTodo)
.put(helpers.updateTodos)
.delete(helpers.deleteTodos)

module.exports = router;
