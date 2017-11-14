# Create node environment from scratch
- install node from node web
- create a folder for our project
- npm init
- npm install --save express
- touch index.js // main file where server starts
- in index.js
```
// include
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;


// set get
app.get('/', function(req, res){
    res.send('Hi there from express');
});

//set port
app.listen(port, function(){
    console.log("App is running on PORT " + port);
})

```

Tips
```
app.get('/', function(req, res){
    // if res.send detect a obj it will call res.json and send as json.
    // res.send is parent of res.json
    res.send({message: 'Hi there from express'});
    // res.json({message: 'Hi there from express'}); 
});

```