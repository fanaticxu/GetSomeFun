## todoList project Notebook in Getsomefun folder


### Array 
*   collection 1

```
 console.log(arr.splice(-1, 1)); // delete the last item of array but return the delete item
 console.log(arr); // print new array
```
	
	
### DOM manipulation

*   collection 1
HTML
```
<ul class="list">

    <li class="task done">drink coffee <span>X</span></li>
    <li class="task done">go to sleep <span>X</span></li>
</ul>
```
Javascript
```
    $('.list').on('click', 'li', function(event){
        toggleCrossTodo($(this));
    });

    $('.list').on('click', 'span', function(e){
        // this function stop bubbling up the event chain
        e.stopPropagation();
        deleteTodo($(this).parent());
    });
```

