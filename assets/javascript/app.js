$(document).ready(function() {
   

 
    // Create a function that creates the start button and initial screen
    
    function openingDisplay() {
        openDisplay = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Start Trivia Quiz</a></p>";
        $("#mainArea").append(openDisplay);
    }
    
    openingDisplay();
    
    //event handler for start button
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line as demonstrated in class
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
    
        selectedAnswer === correctResponse[questionCounter] ? (
            //alert("correct");
            clearInterval(theTime),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theTime),
            generateLoss()
        )
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // reset close
    
    });  //  jQuery Close?? Had to put in.

    //Create Variables

    var openDisplay;
    var quizHTML;
    var counter = 20;
    //Create question and response arrays
    var questionArray = 
    ["What band first released this 1960's hit song '19th Nervous Breakdown'?",
    "What 1973 album hit #1 and has remained on Billboard 200 the longest?",
    "What song was the biggest charting US hit in Led Zepplins history?",
    "What was the Beatles top selling Album?",
    "What song originally released by 'The Boss' became a #1 hit in 1976 for another band in 1976?",
    "What Classic Rock recording artist was awarded the Nobel Prize in Literature?",
    "What Tom Petty Song refers to Elvis Presley?"];

    var responseArray = [
    ["The Beatles", "Herman Hermits", "The Rolling Stones", "The Kinks"],
    ["The Joker", "Darkside Of The Moon", "Goats Head Soup", "Goodbye Yellow Brick Road"],
    ["Whole Lot Of Love", "Stairway To Heaven", "Heartbreaker", "When The Levee Breaks"],
    ["Abbey Road","Rubber Soul","The White Album","Sgt.Peppers Lonely Hearts Club Band"],
    ["Silly Love Songs", "Born to Run", "Blinded By The Light", "Dream Weaver"],
    ["John Lennon", "Bob Dylan", "Tom Petty", "Paul Simon"],
    ["Free Fallin", "Running Down A Drean", "American Girl", "Learning To Fly"], ];

    //create correct response
    var correctResponse =
    [ "3. The Rolling Stones",
    "2. Darkside Of The Moon",
    "1. Whole Lot Of Love",
    "4. Sgt.Peppers Lonely Hearts Club Band",
    "3. Blinded By The Light",
    "2. Bob Dylan",
    "1. Free Fallin"];

    var questionCounter = 0;
    var selecterAnswer;
    var theTime;
    var correctCount = 0;
    var incorrectResponse = 0;
    var unansweredResponse = 0;

    //logic functions

    //genrate a win, set waiting time for next question
    
    function generateWin() {
        correctCount++;
        quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You know your Classic Rock! You answered correctly with: " + correctResponse[questionCounter] + "</p>";
        $("#mainArea").html(quizHTML);
        
        setTimeout(wait, 3000);  
    }//end generate win

    //generate a loss, set waiting time for next question
    function generateLoss() {
        incorrectResponse++;
        quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! You need to listen to more Classic Rock! The right answer is: "+ correctResponse[questionCounter] + "</p>";
        $("#mainArea").html(quizHTML);
        setTimeout(wait, 3000); 
    }//end generate loss
    //generate a time up loss, set waiting time for next question
    function timeoutLoss() {
        unansweredResponse++;
        quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time is Up!  The correct answer was: " + correctResponse[questionCounter] + "</p>";
        $("#mainArea").html(quizHTML);
        setTimeout(wait, 3000); 
    }//end timeup loss

    //generate questions and how answered will be displayed

    function generateQuestions() {
        quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>1. " + responseArray[questionCounter][0] + "</p><p class='answer'>2. "+responseArray[questionCounter][1]+"</p><p class='answer'>3. "+responseArray[questionCounter][2]+"</p><p class='answer'>4. "+responseArray[questionCounter][3]+ "</p>";
        $("#mainArea").html(quizHTML);
    }; //end generate question
    
    function wait() {
        // generate more questions
    questionCounter < 6 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 20,
        timerWrapper() ):
        
       (finalScreen())
    }; //end function
    //set time and final screen
    function timerWrapper() {
        theTime = setInterval(twentySeconds, 1000);
        function twentySeconds() {
            if (counter === 0) {
                clearInterval(theTime);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        quizHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Finished! Are you a Classic Rock master?" + "</p>" + "<p class='summary-correct'>Correct Responses: " + correctCount + "</p>" + "<p>Incorrect Responses: " + incorrectResponse + "</p>" + "<p>No Response: " + unansweredResponse + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(quizHTML);
    }
    //set reset to clear counters and reset
    function resetGame() {
        questionCounter = 0;
        correctCount = 0;
        incorrectResponse = 0;
        unansweredResponse = 0;
        counter = 20;
        generateQuestions();
        timerWrapper();
    }
    //adding a sound to selection buttons
    var clickSound = new Audio("assets/sounds/sound-click.mp3");
    
    

