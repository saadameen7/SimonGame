let colorBtn = ['red', 'green', 'blue', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {
    if (!started) {
        $('#level-title').text('Level '+level);
        nextsequnce();
        started = true;
    }
});

$('.btn').click(function ( ) {
    let userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor)
    Animate(userChoosenColor)
    checkAnswer(userClickedPattern.length - 1);
});
 
// funtion that check the game answer
const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextsequnce();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $("body").addClass('game-over');
        $('#level-title').text("Game Over, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);
        gameOver();
    }
}
//random no. generated 
const nextsequnce = () => {
    userClickedPattern = []
    level++;
    $('#level-title').text("level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = colorBtn[randomNumber];
    console.log(randomChosenColour)
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
//Play music sound function
const playSound = (name) => {
    let audio = new Audio(name + '.mp3');
    audio.play();
}

const Animate = (value) => {
    $('#' + value).addClass("pressed");
    setTimeout(() => {
        $('#' + value).removeClass("pressed");
    }, 200);
}


// gameOver Function
const gameOver = () => {
    level = 0;
    gamePattern = [];
    started = false;
}