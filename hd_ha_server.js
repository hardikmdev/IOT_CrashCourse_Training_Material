// HD - Home Automation Sample for IoT
// hd_ha_server.js

// Import modules and define locals
const http = require('http');
// import express2 from 'express';  // --> didn't work, works with babel, ignore
const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// const expressHbs = require ('express-handlebars');
const pug = require('pug');

var url = require('url');

const app = express();

var events = require('events');
var eventEmitter = new events.EventEmitter();
// const apiKey = '*****************';

app.set('view engine','pug');
// app.set('view engine','ejs');
// app.engine('.hbs',expressHbs({ defaultlayout : 'layout', extname : '.hbs' }));  // middlewear layout, 
// app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

// Compile the source code
// const compiledFunction = pug.compileFile('room.pug');
// Render a set of data
// console.log(compiledFunction({
  // name: 'BedRoom1'
// }));


//Create an event handler:
var myEventHandler = function () {
  console.log('Status Change!!');
}

//Assign the event handler to an event:
eventEmitter.on('stateChange', myEventHandler);
//Fire the 'stateChange' event:
eventEmitter.emit('stateChange');

// try GET
// when a GET request is made to the root (--> '/') of our website, 
// the callback function we specified within the get() method will be invoked
app.get('/', (req, res, next) => {
    // res.send('Hello From HD') ;
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // var q = url.parse(req.url, true).query;
    res.render('index', {
        title: 'Homepage',
        error: null}) ;
});

app.get('/roomlist', (req, res, next) => {
    // res.send('Hello From HD') ;
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // var q = url.parse(req.url, true).query;
    // res.render('sensor-list', {
        // title: 'Sensor Lists',
        // error: null}) ;
    const file = app.get('views') + '/room.pug';
    pug.renderFile(file, {
    // pug.renderFile('/views/room.pug', {
        name: 'BR1'
    })
});


app.get('/sensor-list', (req, res, next) => {
    // res.send('Hello From HD') ;
    // res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    res.render('sensor-list', {
        title: 'Sensor Lists',
        error: null}) ;
});

app.get('/device', (req, res, next) => {
    // res.send('Hello From HD') ;
    // res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true).query;
    res.render('device', {
        title: 'Lists Devices',
        error: null}) ;
});

app.get('/profile', (req, res) => {
  const people = require('./people.json');
  const person = people.profiles.find(p => p.id === req.query.id);
  // res.send(req.query.id);
  res.render('profile', {
    title: `About ${person.firstname} ${person.lastname}`,
    error: 'Need, person from people: try again'
  });
});

// try POST
app.post('/', function (req, res) {
    request(url, function (err, response, body) {
        if(err){
            res.render('index', {
                error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            res.render('index', {error: null});
        }
    });
});

// try PUT

// API
app.get('/api', (req, res) => {});


// SERVER HOSTING
const port = process.env.PORT || 5656;  // --> default to 5656, unless command line port supplied
// app.listen(port, () => {
    // console.log('http://localhost:5656')
// })
const server = app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Express running → PORT ${server.address().port}`);
        
    }
});