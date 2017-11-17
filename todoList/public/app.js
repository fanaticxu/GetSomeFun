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



    // add event listener to each li
    $('.list').on('click', 'li', function(event){
        // updateTodoStatus($(this));
        // var todoValuePlusX = event.target.innerText;
        // var arr = todoValuePlusX.split(' ');
        // arr.splice(-1, 1);
        // var todoValue = arr.join(' ');
        
        // console.log(arr.splice(-1, 1)); // delete the last item of array but return the delete item
        // console.log(arr); // print new arr
        toggleCrossTodo($(this));
    });

    //     add delete button listener
    // !!! code wont work due to event delegation
    // !!! code add the very beginning when the page loads and their is no guarantee that any span's are actually there.
    // $('span').on('click', function(event){
    //     console.log("clicked");
    // });
    // We need to add event listener to parent tags
    $('.list').on('click', 'span', function(e){
        // this function stop bubbling up the event chain
        e.stopPropagation();
        deleteTodo($(this).parent());
    });


});

function toggleCrossTodo(todoTag) {
    var todoId = todoTag.data('id');
    var isTodoCompleted;
    $.getJSON(`/api/todos/${todoId}`)
    .done(function(data){
        isTodoCompleted = data.completed;
        console.log(isTodoCompleted);
        
    })
    .then(function(){
        $.ajax({
            url: `/api/todos/${todoId}`,
            method: 'put',
            data: {'completed': !isTodoCompleted}
        })
        .then(function(data){
            console.log(data);
        })
    })
    .then(function(){
        todoTag.toggleClass('done');
    });

}

function updateTodoStatus(todoTag) {
    var todoId = todoTag.data('id');
    console.log(todoId);
}

function deleteTodo(parentTag) {
    var todoId = parentTag.data('id');
    

    $.ajax({
        method: 'DELETE',
        url:`/api/todos/${todoId}`
    })
    .then(function(data){
        // select the parent tag of span and remove the whole li line 
        parentTag.remove();
    })
    .catch(function(err){
        console.log(err);
    });
}

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo) {
    // make li tag with todo.name print
    var newTodo = $('<li class = "task">' + todo.name + ' <span>X</span></li>');
    // jQuery method, to save hidden data into a tag we create before.
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
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