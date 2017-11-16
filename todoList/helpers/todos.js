var db = require('../models');

exports.getTodos = function(req, res){
    //get all todos in the mongo database
    db.Todo.find()
    .then(function(todos){
        // almost the same as res.send, print the todos data as json
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    }) 
}

exports.createTodos = function(req, res){
    // body-parser will convert the req.body from string to json object 
    db.Todo.create(req.body)
    // if we use postman to post message .then will send back the whole body of data to postman
    /* e.g.
        {
            "__v": 0,
            "name": "go back home",
            "_id": "5a0c1cba05c257095dd4c844",
            "created_date": "2017-11-15T10:53:46.692Z",
            "completed": false
        }
    */
    .then(function(newTodo){
        //http status 201 means created, the status of the send back message will set to 201
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}


// :todoId is like a placeholder, it defines something as a path variable
// it will match anything after /todos/api/ e.g. /todos/api/saldfjahsdklfh
exports.showTodo = function(req, res){
    // req.params.[placeholder] will get the actual input string of the placeholder
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        console.log(err);
    })
}


// PUT part, to update a todo.
// When you check off a todo, you're actually sending a request in our to do app
// it's generating AJAX call sending a request to change the completed status
exports.updateTodos = function(req, res){
    // new: true will responding with the updated version, todo in .then will be the updated todo.
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    })
}

// Delete part
exports.deleteTodos = function(req, res){
    db.Todo.remove({_id: req.params.todoId})
    .then(function(){
        res.json({message: 'We deleted it!'})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;