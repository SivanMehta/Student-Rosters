var mongoModel = require("./mongoModel.js");

exports.init = function(app)
{
    app.get("/classes/create", isLoggedIn, function(request, response)
    {
        response.render("classes/create", { navData: {breadcrumb: [["Classes", "/profile"]],
                                                           currentPage: "Create"}});
    });

    app.post("/classes/create", isLoggedIn, createClass);

    app.get("/classes/:className", isLoggedIn, oneClass);
    app.get("/classes/:className/train", isLoggedIn, training)
}

getUsersClasses = function(email, response)
{
    mongoModel.retrieve("classes",
    {creator: email},
    function(classes)
    {   
        response.render('users/profile', { currentUser : email,
                                           classes : classes,
                                           navData: {breadcrumb: [["Profile", "#!"]],
                                                           currentPage: email} });
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

oneClass = function(request, response)
{
    query = {
        creator : request.user.local.email,
        className : request.params.className
    }

    mongoModel.retrieve("enrollments",
        {className: request.params.className},
        function(enrollments)
        {
            mongoModel.retrieve("classes",
            query,
            function(classes)
            {   
                response.render('classes/one', { classData : classes[0],
                                                 enrollments: enrollments,
                                                 navData: {breadcrumb: [["Classes", "/profile"]],
                                                           currentPage: request.params.className} 
                                                });
            });
        }
    );
}

training = function(request, response)
{
    response.render("classes/train", {navData: {breadcrumb: [["Classes", "/profile"], [request.params.className, "/classes/" + request.params.className]],
                                                           currentPage: "Train"}})
}

function isLoggedIn(req, res, next)
{

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}