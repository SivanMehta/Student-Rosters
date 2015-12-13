var mongoModel = require("./mongoModel.js");

exports.init = function(app)
{
    app.get("/enrollments/:className/create", isLoggedIn, enrollmentsForm);

    app.post("/enrollments/:className/create", isLoggedIn, generateEnrollments)
}

enrollmentsForm = function(request, response)
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

generateEnrollments = function(request, response)
{
    var lucky_students = Object.keys(request.body);

    var insertions = [];

    for(var i = 0; i < lucky_students.length; i ++)
    {
        insertions.push({
            className: request.params.className,
            student: lucky_students[i],
            instructor: request.user.local.email
        })
    }

    mongoModel.create("enrollments",
    insertions,
    function(crashed)
    {
        response.render("classes/one", {enrollments: insertions, classData: {className: request.params.className}});
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