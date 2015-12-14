$("#startGame").click(function()
{
    $("#playground").html("");

    setup_game();
});

setup_game = function()
{
    var className = $("li a").contents()[1].data;
    var students;

    $.ajax({
        type: "GET",
        url: "/students/" + className,
        success: function(data, status)
        {
            students = JSON.parse(data);
            guessTheName(students)
        }

    });
}

shuffle = function(arr)
{
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }

    return shuffled
}

var victims;

guessTheName = function(students)
{
    students = shuffle(students);
    victims = students.slice(0, 4);

    var pictureRow = document.createElement("div");
    pictureRow.class = "row";

    for(var i = 0; i < victims.length; i++)
    {
        var thumbnail = $.parseHTML("<div class='col-xs-6 col-md-3'>" + 
                                        "<a href = '#!' class = 'thumbnail'>" + 
                                            "<img src = " + victims[i].facebook.photo +  " >" + 
                                        "</a>" + 
                                    "</div>")[0];

        pictureRow.appendChild(thumbnail);
    }

    playground.appendChild(pictureRow);


}
