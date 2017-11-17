// page load, DOM ready
$(document).ready(function(){
    // Any code we put here will wait to run until the Dom has loaded
    // send AJAX request, get JSON data from /api/todos
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    })
});

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
        // make li tag with todo.name print
        var newTodo = $('<li class = "task">' + todo.name + '</li>')
        // append li into ul tag
        $('.list').append(newTodo);
    });
}
