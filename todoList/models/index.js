var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise;     // allow us to use Promise syntax

module.exports.Todo = require("./todo");