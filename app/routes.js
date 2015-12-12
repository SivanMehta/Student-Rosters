var mongoModel = require("./models/mongoModel.js");
var mongoModel = require("./models/classes.js");

module.exports = function(app, passport)
{
    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // route for signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    
    app.get('/profile', isLoggedIn, function(req, res)
    {
        if(req.user.local.email == undefined)
        {
            res.render("users/facebookProfile", {user : req.user});
            return;
        }

        getUsersClasses(req.user.local.email, res);
    });

    app.get('/users', isLoggedIn, function(req, res)
    {
        if(req.user.local.email == undefined)
        {
            res.render("index");
            return;
        }

        mongoModel.retrieve("users",
            { facebook: { $exists: true}},
            function(modelData)
            {
                res.render('users/all', { currentUser : req.user,
                                            users : modelData});
            });

    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // FACEBOOK

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next)
{

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
