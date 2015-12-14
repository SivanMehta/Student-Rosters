var mongoModel = require("./mongoModel.js");

exports.init = function(app)
{
    app.get("/students/:className", isLoggedIn, getStudentsForAClass)
}

getStudentsForAClass = function(request, response)
{
    mongoModel.retrieve("enrollments",
    {className: request.params.className, instructor: request.user.local.email},
    function(enrollments)
    {
        var students = [];

        for(var i = 0; i < enrollments.length; i ++)
        {
            students.push(enrollments[i].student);
        }
        mongoModel.retrieve("users",
        {'facebook.name': { $in: students}},
        function(students)
        {
            response.send(JSON.stringify(students));
        });
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