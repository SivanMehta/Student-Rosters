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
    var round = 0;

    guessTheName = function()
    {
        if(round > 10)
        {
            game_over();
            return;
        }

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
        try
        {
            question_prompt.textContent = "Who is " + victims[correct].facebook.name + "?";
        }
        catch(err)
        {
            console.error(err);
            game_over();
        }

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
        $("#score").html(score + " correct");

        round += 1;

        setTimeout(guessThePicture, 500);
    }

    guessThePicture = function()
    {
        if(round > 10)
        {
            game_over();
            return;
        }

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

        var question_img = document.createElement("img");
        try
        {
            question_img.src = victims[correct].facebook.photo;
        }
        catch(err)
        {
            console.error(err);
            game_over();
        }

        var question_prompt = document.createElement("p");
        question_prompt.textContent = "Who is this?";

        playground.appendChild(question_img);
        playground.appendChild(question_prompt);
        playground.appendChild(display_row);
    }

    guessPicture = function(id)
    {
        if(id == correct)
        {
            score += 1;
        }
        $("#playground").html("");
        $("#score").html(score + " correct");

        round += 1;

        setTimeout(guessTheName, 500);
    }

    game_over = function()
    {
        $("#playground").html("");

        var message = $.parseHTML("<div class='jumbotron'>" + 
                                        "<h1>Game Over!</h1>" +
                                        "<p>Your score was " + score + "/" + round + "!</p>" +
                                        "<p><a class='btn btn-primary btn-lg' href=''javascript:history.go(0);'' role='button'>Play Again</a></p>" +
                                  "</div>")[0];

        playground.appendChild(message);
    }

    guessTheName()
    
}

