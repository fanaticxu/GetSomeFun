var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
//it takes in the body which is a string and it's going to parse it and turned it into an object for us to use.
    bodyParser = require('body-parser');


var todoRoutes = require('./routes/todos');

// two lines below allow us to access the request body that comes in a put request or a post request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send('Hello from the root route');
});

app.use('/api/todos', todoRoutes); 

app.listen(port, function(){
    console.log("App is running on PORT " + port);
})