$("#startGame").click(function()
{
    $("#playground").html("");

    setup_game();
});

setup_game = function()
{
    var className = $("li a").contents()[1].data;

    var students;

    console.log(className);

    $.ajax({
        type: "GET",
        url: "/students/" + className,
        success: function(data, status)
        {
            students = data;
            renderGame(students)
        }

    });
}

renderGame = function(students)
{
    console.log(students);
}
