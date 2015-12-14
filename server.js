/*
Largely based off of the tutorial provided here:
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
*/

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 50000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration 
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'Sivan Mehta is really cool' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// static file
app.use(express.static(__dirname + '/public'));

// routes 
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/models/classes.js').init(app);
require('./app/models/enrollments.js').init(app);

// launch 
app.listen(port);
console.log('Server Running at localhost:' + port);