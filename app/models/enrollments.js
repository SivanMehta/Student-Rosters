var mongoModel = require("./mongoModel.js");

exports.init = function(app)
{
    app.get("/enrollments/:className/create", isLoggedIn, createEnrollments);
}

createEnrollments = function(request, response)
{
    mongoModel.retrieve("users",
    { facebook: { $exists: true}},
    function(students)
    {
        response.render("enrollments/create", {className : request.params.className,
                                               students: students});
    }
    );

}

function isLoggedIn(req, res, next)
{

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}