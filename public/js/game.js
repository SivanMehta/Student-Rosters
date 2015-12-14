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

// Fisher-Yates Algorithm
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

var correct;

guessTheName = function(students)
{
    students = shuffle(students);
    var victims = students.slice(0, 4);
    correct = Math.round(Math.random() * 4);

    var pictureRow = document.createElement("div");
    pictureRow.class = "row";

    for(var i = 0; i < victims.length; i++)
    {
        var thumbnail = $.parseHTML("<div class = 'col-xs-6 col-md-3' onclick = 'guessName(" + victims[i].facebook.name + ")'>" + 
                                        "<a href = '#!' class = 'thumbnail'>" + 
                                            "<img src = " + victims[i].facebook.photo +  " >" + 
                                        "</a>" + 
                                    "</div>")[0];

        pictureRow.appendChild(thumbnail);
    }

    var question_prompt = document.createElement("b");
    question_prompt.textContent = "Who is " + victims[correct].facebook.name + "?";

    playground.appendChild(question_prompt);
    playground.appendChild(pictureRow);

}
