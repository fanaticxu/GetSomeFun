# Create node environment
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


## What’s MongoDB?

MongoDB is a document database which belongs to a family of databases called NoSQL - not only SQL. In MongoDB, records are documents which behave a lot like JSON objects in JavaScript. Values in documents can be looked up by their field’s key. Documents can have some fields/keys and not others, which makes Mongo extremely flexible.

This is different than SQL databases like MySQL and PostgreSQL, where fields correspond to columns in a table and individual records correspond to rows.

## Prerequisites

*   **You should have some familiarity with the Mac Terminal application** since you’ll need to use it to install and run MongoDB.
*   **Dependencies.** This guide goes over the two main ways to install MongoDB on a Mac. One of the methods requires Homebrew.
    *   **Homebrew**. Homebrew is a package manager for the Mac – it makes installing most open source software (like MongoDB) as simple as writing `brew install mongodb`. Follow the instructions in the [How to Install Homebrew on a Mac]({homebrew) instruction guide.

## Installation Overview

There are two primary ways to install MongoDB on a Mac. The best way to install MongoDB is with Homebrew. The other way to install MongoDB is by downloading it from the the [MongoDB website](https://www.mongodb.org/downloads#production).

## Install and Run MongoDB with Homebrew

*   **Open the Terminal app** and type `brew update`.
*   **After updating Homebrew** `brew install mongodb`
*   **After downloading Mongo,** create the “db” directory. This is where the Mongo data files will live. You can create the directory in the default location by running `mkdir -p /data/db`
*   **Make sure that the `/data/db` directory has the right permissions** by running

    <div class="highlighter-rouge">

        > sudo chown -R `id -un` /data/db
        > # Enter your password

    </div>

*   **Run the Mongo daemon**, in one of your terminal windows run `mongod`. This should start the Mongo server.
*   **Run the Mongo shell**, with the Mongo daemon running in one terminal, type `mongo` in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
*   **To exit the Mongo shell** run `quit()`
*   **To stop the Mongo daemon** hit `ctrl-c`

## Install and Run MongoDB by Downloading it Manually

*   **Go to the MongoDB website’s [download section](https://www.mongodb.org/downloads#production)** and download the correct version of MongoDB.
*   **After downloading Mongo** move the gzipped tar file (the file with the extension .tgz that you downloaded) to the folder where you want Mongo installed. In this case, we’ll say that we want Mongo to live in our home folder, and so the commands might look something like this:

    <div class="highlighter-rouge">

        > cd Downloads
        > mv mongodb-osx-x86_64-3.0.7.tgz ~/

    </div>

*   **Extract MongoDB from the the downloaded archive**, and change the name of the directory to something more palatable: > cd ~/ > tar -zxvf mongodb-osx-x86_64-3.0.7.tgz > mv mongodb-osx-x86_64-3.0.7 mongodb

*   **Create the directory where Mongo will store data**, create the “db” directory. ou can create the directory in the default location by running `mkdir -p /data/db`
*   **Make sure that the `/data/db` directory has the right permissions** by running

    <div class="highlighter-rouge">

        > sudo chown -R `id -un` /data/db
        > # Enter your password

    </div>

*   **Run the Mongo daemon**, in one terminal window run `~/mongodb/bin/mongod`. This will start the Mongo server.
*   **Run the Mongo shell**, with the Mongo daemon running in one terminal, type `~/mongodb/bin/mongo` in another terminal window. This will run the Mongo shell which is an application to access data in MongoDB.
*   **To exit the Mongo shell** run `quit()`
*   **To stop the Mongo daemon** hit `ctrl-c`

Tips
```
app.get('/', function(req, res){
    // if res.send detect a obj it will call res.json and send as json.
    // res.send is parent of res.json
    res.send({message: 'Hi there from express'});
    // res.json({message: 'Hi there from express'}); 
});

```