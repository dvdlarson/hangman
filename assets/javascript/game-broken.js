


var currentMaskValue="";
var targetWord="";
var targetObject;
var targetID;
var guessCount = 0;
var guessedLetter;
var guessWord="";
var wrongGuessCount=0;
var guessRemaining=6;
var wrongGuesses = [];
var totalGuesses = [];
var guessedArray = [];
var winCount = 0;
var lossCount = 0;
var winPic="";
var winSound="";
var bkgrnd="";
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function elm(elementID) {
    return document.getElementById(elementID);
};




function initializeGame() {

elm("playAgainButton").setAttribute("style","display:none");
guessRemaining=6;
elm("guessremaining").innerHTML=guessRemaining;
elm("subheader").innerHTML="Press any key to guess a letter.";
elm("sidebarpic").src="./assets/media/questionmark.png";
guessedArray=[];
currentMaskValue="";
elm("lettersguessed").innerText="";
guessCount=0;
wrongGuessCount=0;
var wordList = [word1,word2];
//, {word2}, {word3}, {word4}, {word5}, {word6}, {word7}
var rand = Math.floor(Math.random() * wordList.length);
targetObject = new Object(wordList[rand]);
 console.log("game initialized: target object:" + targetObject);
 targetID;
 targetWord = targetObject.value;
 currentMaskValue=targetObject.maskValue;
 winPic=targetObject.winPic;
 bkgrnd=targetObject.bkgrnd;
 winSound=targetObject.winSound;
 console.log("target id: " + targetID);
 console.log("target winpic: " + winPic);
 console.log("target bkrd: " + bkgrnd);
 console.log("target winsound: " + winSound);


elm("maskvalue").innerHTML=currentMaskValue;
console.log("Hey you unrepentant cheating bum, the answer is: "+targetWord);
console.log("target obj: " + targetObject);
console.log("maskvalue: " + currentMaskValue);
gameStart();

};

//gamestart by clicking letter in keyboard layout
/* 
function selectLetter(letter) {
    guessedLetter=letter;
    gameStart(guessedLetter);
}; */

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

  //funky work-around for problem - on page load, wrong guesses are decremented by 1 and blank character is pushed into guessed characters array
    /* if (guessedLetter===""){
        changeCase(guessedLetter);
        guessCount++;
        return;
        }; */
    if(checkIfGuessed(guessedLetter,guessedArray)===false) {//if letter has not been guessed and is not blank, 
    
    guessedArray.push(guessedLetter);//push guessed letter into guessed letter array
    elm("lettersguessed").innerHTML=guessedArray;//replace guessed letter section with updated guessed letter array
    guessCount++;//increment total guess counter
    currentMaskValue=checkAndReplace(guessedLetter,targetWord,currentMaskValue);//check target word for guessed letter and update the masked value array wherever it is found.
    if (guessRemaining===0) {  //check to see if any guesses are remaining
        endGame("lose");
    };
};


//};




}; //end gameStart

function changeCase(element) {
    element.value=element.value.toUpperCase();
};

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
};

function checkAndReplace(guessedLetter,targetWord,currentMaskValue) 
{
    console.log("init C&R guessedLetter: "+guessedLetter);
    console.log("init C&R targetWord: "+targetWord);
    console.log("init C&R maskvalue: "+currentMaskValue);
    
    
    var replaceCount=0;
 //loop through target word and replace corresponding index of masked value//   
    for (var i=0;i<targetWord.length;i++) 
    { console.log("char: "+targetWord.charAt(i));
        if (targetWord.charAt(i)===guessedLetter) 
        {   console.log("match");
            var x = setCharAt(currentMaskValue,i,guessedLetter);
            currentMaskValue = x;
            replaceCount++;
            elm("maskvalue").innerHTML=currentMaskValue;
        
        if (currentMaskValue===targetWord) {endGame("win");}

        }
    };
    if (replaceCount===0) 
        {
            wrongGuessCount++;
            guessRemaining--;
            elm("guessremaining").innerHTML=guessRemaining;//update guesses remaining section
        };
    console.log("new mask value after guess: " + currentMaskValue);
    return currentMaskValue;
};

function checkIfGuessed(guessedLetter,guessedArray) {
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

function endGame(result,targetObject) 
{

    wrongGuesses.push(wrongGuessCount);
    var avgWrong=average(wrongGuesses);
    elm("avgwrong").innerHTML="Average # of incorrect guesses per win:" + avgWrong;
    totalGuesses.push(guessCount);
    var avgGuess=average(totalGuesses);
    elm("avgguesses").innerHTML="Average # of guesses per win: " + avgGuess;
    elm("playAgainButton").setAttribute("style","display:block");

    if (result==="win") 
        {
            winCount++;
            elm("sidebarbkgrnd").src=bkgrnd;
            elm("sidebarpic").src = winPic;
            elm("subheader").innerHTML="You win! The answer was: " + targetWord;
            var sound = document.createElement("audio");
            sound.src=winSound;
            sound.play();
           // alert("You Win!!");
            elm("wincount").innerHTML="Total wins: " + winCount;
    
          //  nextGame();
          //  initializeGame();
           // playAgain();
        };

    if (result==="lose") 
        {
            lossCount++;

            elm("sidebarpic").src="./assets/media/youlose.png";

            var audio = new Audio("./assets/media/sadtrombone.mp3");
            audio.play();
            
          //  elm("sidebarbkgrnd").src=bkgrnd;  
            alert("You Lose!")         
            elm("subheader").innerHTML="You lose! The answer was: " + targetWord;
            
            elm("losscount").innerHTML="Total Losses: " + lossCount;
            nextGame();
            initializeGame();
           
        };

        function nextGame() {
            for (var i=3;i>0,i--;) 
            {
            elm("subheader").innerHTML="Next game begins in: " + i;
            wait(1000);
            }
        }

/* function playAgain() {
    wait(2000);
    var playAgain=confirm("Would you like to play again?");
    if (playAgain===true) {
        initializeGame();
        }
    else {location.reload();};

    };   */
    
};

function reset() {
    location.reload();
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
 };



