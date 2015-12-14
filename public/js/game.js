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

var accessMe;

guessTheName = function(students)
{
    students = shuffle(students);
    accessMe = students;
}
