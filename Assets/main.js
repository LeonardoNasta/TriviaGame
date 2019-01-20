jQuery(document).ready(function() {


//spent far too long on this being completely lost. At the moment it does about 30% of what is should.
$("#triviaGame").hide();

// create objects for each question//
////////////////////////////////////

var trivia = [
{
//1
    questions: "The Creator and inventor of Dungeons and Dragons is",
    choices: ["Gary Gygax", "Cliff Bleszinski" ," Terry Crews","Peter Adkison"],
    answer: 1,
    img: "images/gygax.png" ,
    
},
//2
{
    questions: "How many Bonus Actions does each player get on their turn?",
    choices: ["2", "as many as you want" ," 3 ","only 1"],
    answer: 4,
    img: "images/monk.png" ,
    
    
},
//3
{
    questions: "Which of these characters has their very own Guide to Monsters?",
    choices: ["Boruto, Naruto's son", "Volo" ," Mordenkainen ","Tiamat"],
    answer: 2,
    img: "images/volo.jpg" ,
    
    
},
//4
{
    questions: "Which of these is not an official D&D class?",
    choices: ["Cleric", "Barbarian" ," Ranger ","Shaman"],
    answer: 4,
    img: "images/wizard.png" ,
    
    
},
//5
{
    questions: "Which of these actors based a film on their own D&D Characters?",
    choices: ["Tom Hanks", "Vin Diesel" ," Paul Rudd ","Ewan McGregor"],
    answer: 2,
    img: "images/vin.jpg" ,
    
    
},
//6
{
    questions: "What is the highest level spell a player can learn?",
    choices: ["9", "10" ," 20 ","11"],
    answer: 1,
    img: "images/dino.png" ,
    
    
},
//7
{
    questions: "Which of these is NOT a real D&D spell?",
    choices: ["Create or Destroy Water", "Meteor Swarm" ," Animal Shapes ","Abyssal Artillary"],
    answer: 4,
    img: "images/d20.png" ,
    
    
},
]


// possible text depending on outcome.
/////////////////////////////////////
    var textOptions = {
        correct: "You safely traverse further down into the dungeon.",
        incorrect: "A zombie lunges at you from behind. As you swing your blade, you drop your rations and rope.",
        incomplete: "Your lack of action results in your capture and the Lich turns you into one of his minions.",
        finished: "You arrive in the throne room of a long forgotten king. It is filled with gold and magical items.",
    }


//create all necessary global variables
///////////////////////////////////////

$this = $(this);

currentlyOn = 0;

correctCount = 0;

wrongCount = 0;

timer = 20;

var idle;

var userSelection;


//start the game upon click of Enter? button.
///////////////////////////////////////////

$("#start").on("click",function(){
    start();
});


function start() {

    correctCount = 0;
    wrongCount = 0;
    unanswered = 0;
    currentlyOn = 0;

    $("#startArea").hide();
    $("#final").hide();
    $("#answerSpace").hide();
    $("#triviaGame").show();
    $("#timeleft").text(timer);
    showQuestions();

 }


          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         /////////// I wasnt able to complete the final part on my own and based the timer functions off of other students work.////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       ///////////  I will continue working on this until it works ///////////////////////////////////////////////////////////////
 function showTimer() {
     seconds --;
     if 
     (seconds < 1) {
         idle = true;
         clearInterval(timer);
         showAnswer();
     }
 }

 function timerOn() {
    seconds = 20;
    $("#timeLeft").html("The Lich arrives in " +seconds);
    idle = false
    time = setInterval(showTimer, 1000)
    
 }

    //Shows the questions panel as well as making the choices selectable for the user. 

 function showQuestions() {
    $("#questionSpace").show();
    $("#answerSpace").hide();

    $(".question").html(trivia[currentlyOn].questions);
 
////attempted to rework this section from classmates work but I am running into bugs that I'm not sure the root of./// 
    for (var i = 0; i <= 4; i++) {
        var Qs = $("<div>");
        Qs.text(trivia[currentlyOn].choices[i]);
        Qs.attr(
            {"data-index": i });
        Qs.addClass("userChoice");
        $(".choices").append(Qs);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
        timerOn();

        $(".userChoice").on('click',function (){
            userSelection = $this.data('index');
            clearInterval(timer);
            showAnswer();

        }) 
 }

 function showAnswer() {
     $("#final").hide();
     $("#questionSpace").hide();
     $("#answerSpace").show();
     $(".userChoice").empty();

     //attaches the correct answer to a variable.
     var correctText = trivia[currentlyOn].choices[trivia[currentlyOn].answer];
     var CorrectIndex = trivia[currentlyOn].answer;

     console.log(correctText,CorrectIndex);

    //Logic for confirming correct and incorrect answers.
     if ((userSelection === CorrectIndex) && (idle === false)) {
         correctCount ++;
         $("#textOptions").html(textOptions.correct);
     }
     else if ((userSelection !== CorrectIndex) && (idle === false)) {
        wrongCount ++;
        $("#textOptions").html(textOptions.incorrect);
     }

    else {
        unanswered ++;
        $("#textOptions").html(textOptions.incomplete);
        idle = false
 }
 
 if (currentlyOn ===(trivia.length-1)) {
    setTimeout(completed, 10000);
} else {
    currentlyOn++;
}




 function completed() {
    $("#final").show();
    $("#questionSpace").hide();
    $("#answerSpace").hide();
    $("#resultText").html(text.finished);
    $("#correct").html("Correct Answers: " + correctCount);
    $("#wrong").html("Wrong Answers: " + wrongCount);
    $("#unanswered").html("Didn't Answer: " + unanswered);
 }

}
});