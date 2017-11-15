var mongoose = require('mongoose');
mongoose.set('debug', true);
// mongoose.connect('mongodb://localhost/todo-api');
// mongoose.Promise = Promise;     // allow us to use Promise syntax


//(node:2241) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
var Promise = mongoose.connect('mongodb://localhost/todo-api', {useMongoClient: true});
module.exports.Todo = require("./todos");