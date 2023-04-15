
const buttonColours = ["red",'blue',"green",'yellow'];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

document.addEventListener("keydown",function(){
    if(!started){
        document.querySelector("#level-title").innerHTML="Level "+level;
        nextSequence();
        started=true;
    }
}) 

document.addEventListener("click", function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}) 


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 800);
        }
    }else{
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.querySelector("#level-title").innerHTML="Game Over, Press any key to enter.";

        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
        },200)

        startOver();
    }

}



function nextSequence(){
    userClickedPattern=[];
    level++;

    document.querySelector("#level-title").innerHTML="Level "+level;

    var randomNumber =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var x = document.querySelector('.'+randomChosenColour);

    setTimeout(function() {
        x.style.visibility = "hidden";
        }, 100);

    setTimeout(function() {
         x.style.visibility = "visible";
       }, 300); 

       playSound(randomChosenColour);
     
      
    
}



function animatePress(currentColour){
    document.querySelector('.'+currentColour).classList.add('pressed');
    setTimeout(function(){
        document.querySelector('.'+currentColour).classList.remove('pressed');
    },100);
}


function playSound(name){

    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}







