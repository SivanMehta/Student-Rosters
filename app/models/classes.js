var mongoModel = require("./mongoModel.js");

exports.init = function(app)
{
    app.get("/classes/create", function(request, response)
    {
        response.render("classes/create", {});
    });
}