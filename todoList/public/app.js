// page load, DOM ready
$(document).ready(function(){
    // Any code we put here will wait to run until the Dom has loaded
    // send AJAX request, get JSON data from /api/todos
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    })

    // add event listener to catch press enter event
    $('#todoInput').keypress(function(event){
        if(event.which == 13) {
            createTodo();
        }
    });
});

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo) {
    // make li tag with todo.name print
    var newTodo = $('<li class = "task">' + todo.name + '</li>')
    // add line cross effect to those tasks been done.
    if(todo.completed){
        newTodo.addClass("done");
    }
    // append li into ul tag
    $('.list').append(newTodo);
}

function createTodo() {
    // get the input value
    var userInput = $('#todoInput').val(); 
    // console.log(userInput);
    //send request to create new todo
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo){
        $('#todoInput').val('');
        if(!newTodo.errors){
            addTodo(newTodo);
        }
        
    })
    .catch(function(err){
        console.log(err); 
    })
} 