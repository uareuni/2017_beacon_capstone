var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
// modules

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
	secret: '239qjgbsmkl;dw3!@#t-54u59jhkdg,f;bxaskjfg23014',
	resave: false,
	saveUninitialized: true
}));
//session info.

app.set('view engine', 'pug');

var client = mysql.createConnection({
     user: 'root',
     password: '!rkdalstn1',
     database: 'capstone'
});

var register = require('./routes/Register')(app, express, client, bodyParser);
app.use('/register', register);
// include member

var login = require('./routes/Login')(app, express, client);
app.use('/signin', login);

var order = require('./routes/Order')(app, express, client);
app.use('/order', order);

var ad = require('./routes/Advertisement')(app, express, client	);
app.use('/advertisement', ad);


app.listen(4902, function(){
     console.log('4902 port is using...');
});
