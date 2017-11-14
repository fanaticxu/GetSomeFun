var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;



app.get('/', function(req, res){
    res.send('Hi there from express');
});

app.listen(port, function(){
    console.log("App is running on PORT " + port);
})