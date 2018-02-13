var currentMaskValue;
var targetWord;
var targetObject;
var targetID;
var guessCount = 0;
var guessedLetter;
var wrongGuessCount=0;
var guessRemaining=6;
var wrongGuesses = [];
var totalGuesses = [];
var guessedArray = [];
var winCount = 0;
var lossCount = 0;

function elm(elementID) {
    return document.getElementById(elementID);
};




function initializeGame() {

elm("guessremaining").innerHTML=guessRemaining;
elm("subheader").innerHTML="Press any key to guess a letter.";

var wordList = [word1];
//, {word2}, {word3}, {word4}, {word5}, {word6}, {word7}
var rand = Math.floor(Math.random() * wordList.length);
 targetObject = wordList[rand];
 targetWord = targetObject.value;
elm("maskvalue").innerHTML=targetObject.maskValue;
console.log("Hey you unrepentant cheating bum, the answer is: "+targetWord);
console.log("target obj: " + targetObject)
currentMaskValue=targetObject.maskValue;
console.log("maskvalue: " + currentMaskValue);

};

function selectLetter(letter) {
    guessedLetter=letter;
    gameStart(letter);
};

function gameStart(letter,targetObject) {
    console.log("choice: "+ letter);
    console.log("guessed letters" + guessedArray);
    console.log("target obj: " + targetObject);
    console.log("target word: " + targetWord);
    console.log("guess count: " + guessCount);
    console.log("wrong guess count: " + wrongGuessCount);
    guessedLetter=letter;
  //  guessedLetter=changeCase(letter); //convert letter to upper case
  //  console.log("converted letter: " + guessedLetter);
    if (checkIfGuessed(guessedLetter)) {return;};//if letter has been guessed, do nothing
    guessedArray.push(guessedLetter);//push guessed letter into guessed letter array
    elm("lettersguessed").innerHTML=guessedArray;//replace guessed letter section with updated guessed letter array
    guessCount++;
    guessRemaining--;
    elm("guessremaining").innerHTML=guessRemaining;//update guesses remaining section
    checkAndReplace(guessedLetter);
    if (guessRemaining===0) {  //check to see if any guesses are remaining
        endGame("lose");
    };
    


//};




}; //end gameStart

function changeCase(element) {
    element.value=element.value.toUpperCase();
};


function checkAndReplace(guessedLetter) 
{
    var replaceCount=0
    for (i=0;i<targetWord.length;i++)
    { 
        if (targetWord.charAt(i)===guessedLetter) 
        {
            currentMaskValue[i]=guessedLetter;
            replaceCount++;
            elm("maskvalue").innerHTML=currentMaskValue;
        
        if (currentMaskValue===targetWord) {endGame("win");}

        }
    };
    if (replaceCount===0) 
        {
            wrongGuessCount++;
        };
    console.log("new mask value after guess: " + currentMaskValue);
};

function checkIfGuessed(guessedLetter) {
    for (i=0; i<guessedArray.length;i++)
    {
        if (guessedArray[i]===guessedLetter) {
            return true;
        }
        else {
            return false;
        }
    }   
};

function endGame(result) 
{

    wrongGuesses.push(wrongGuessCount);
    var avgWrong=average(wrongGuesses);
    elm("avgwrong").innerHTML="Average # of incorrect guesses per win:" + avgWrong;
    totalGuesses.push(guessCount);
    var avgGuess=average(totalGuesses);
    elm("avgguesses").innerHTML="Average # of guesses per win: " + avgGuess;

    if (result==="win") 
        {
            var audio = new Audio(targetObject.winSound);
            audio.play;
            elm("sidebarpic").src=targetObject.winPic;
            elm("sidebarbkgrnd").src=targetObject.bkgrnd;
            elm("subheader").innerHTML="You win! The answer was: " + targetWord;
            winCount++;
            elm("wincount").innerHTML="Total wins: " + winCount;
        };

    if (result==="lose") 
        {
            var audio = new Audio("../media/sadtrombone.mp3");
            audio.play;
            elm("sidebarpic").src=targetObject.winPic;
            elm("sidebarbkgrnd").src=targetObject.bkgrnd;           
            elm("subheader").innerHTML="You lose! The answer was: " + targetWord;
            lossCount++;
            elm("losscount").innerHTML="Total Losses: " + lossCount;
        };

    wait(2000);
    var playAgain=alert("Would you like to play again?");
    if (playAgain===true) {initializeGame();}
    else {location.reload();};

    
    
};

function average(array) 
{
    var sum=0
    for (i=0;i<array.length;i++)
    {
        sum += array[i];
    }
    var avg = sum/array.length;
    return avg;
};

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

