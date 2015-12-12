var mongoModel = require("./mongoModel.js");

exports.init = function(app)
{
    app.get("/classes/create", function(request, response)
    {
        response.render("classes/create", {});
    });

    app.post("/classes/create", isLoggedIn, createClass);
}

getUsersClasses = function(email, response)
{
    mongoModel.retrieve("classes",
    {creator: email},
    function(classes)
    {   
        response.render('users/profile', { currentUser : email,
                                    classes : classes });
    })
}

createClass = function(request, response)
{
    mongoModel.create("classes",
    { creator: request.user.local.email, className: request.body.classname },
    function(modelData)
    {
        getUsersClasses(request.user.local.email, response);
    });
}

function isLoggedIn(req, res, next)
{

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}