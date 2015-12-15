$("#startGame").click(function()
{
    $("#playground").html("");

    setup_game();
});


setup_game = function()
{
    var className = $("li a").contents()[1].data;

    $.ajax({
        type: "GET",
        url: "/students/" + className,
        success: function(data, status)
        {
            students = JSON.parse(data);
            startGame(students)
        }

    });
}

function startGame(students)
{
    // Fisher-Yates Algorithm
    shuffle = function(arr)
    {
        var shuffled = arr.slice(0), i = arr.length, temp, index;
        while (i--)
        {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }

        return shuffled
    }

    var correct;
    var score = 0;
    var round = 1;

    guessTheName = function()
    {
        students = shuffle(students);
        var victims = students.slice(0, 4);
        correct = Math.round(Math.random() * 4);

        var pictureRow = document.createElement("div");
        pictureRow.className = "row";

        for(var i = 0; i < victims.length; i++)
        {
            var thumbnail = $.parseHTML("<div class = 'col-xs-6 col-md-3' onclick = 'guessName(" + i + ")'>" + 
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

    guessName = function(index)
    {
        if(index == correct)
        {
            score += 1;
        }
        $("#playground").html("");
        $("#score").html(score + "/" + round);

        round += 1;
        guessThePicture();
    }

    guessThePicture = function()
    {
        students = shuffle(students);
        var victims = students.slice(0, 4);
        correct = Math.round(Math.random() * 4);


        var display_row = document.createElement("div");
        display_row.className = "row";

        var text_choices = document.createElement("div");
        text_choices.className = "col-md-6";

        for (var i = 0; i < victims.length; i++)
        {
            // <button type="button" className="btn btn-default">Default button</button>
            var button = $.parseHTML("<button type = 'button' class = 'btn btn-default' onclick = 'guessPicture(" + i + ")'>" + victims[i].facebook.name + "</button>")[0];

            text_choices.appendChild(button);
        }

        display_row.appendChild(text_choices);
        playground.appendChild(display_row);
    }

    guessPicture = function(id)
    {
        if(id == correct)
        {
            score += 1;
        }
        $("#playground").html("");
        $("#score").html(score + "/" + round);

        round += 1;
        guessTheName();
    }

    guessTheName()
    
}

