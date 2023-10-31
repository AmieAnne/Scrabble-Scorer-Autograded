// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
 
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
 let word = input.question("Let's play some scrabble! Enter a word: ");  
scorerPrompt(word)
};


let simpleScorer = function(word){
   return word.length
};

let vowelBonusScorer = function(word){
  let score = 0 
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   word = word.toLowerCase()
   for (let letter of word) {
      if(vowels.includes(letter)) {
         score += 3
      }
      else{
         score++
      }
   }
   return score
}
let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let letterPoints = 0;

   // Call transform() to convert
   //    pointValue: [letters] (key: value pair)
   // to
   //    letter: pointValue (key: value pair)
   newPointStructure = transform(oldPointStructure)

   // Loop through each letter of the word
   for (let i = 0; i < word.length; i++) {
      // word[i] = letter
      // newPointStructure[word[i]] = point value
      // letterPoints += parseInt(newPointStructure[word[i]])
      //    Add the point value to the cumulative score
      letterPoints += parseInt(newPointStructure[word[i]])
   }

   // Return the cumulative score
   return letterPoints;
};

let simpleScore = {
   scorerFunction: simpleScorer
}
let vowelScore = {
   scorerFunction: vowelBonusScorer
}
let oldScore = {
   scorerFunction: scrabbleScorer
}
const scoringAlgorithms = [simpleScore, vowelScore, oldScore];

function scorerPrompt(word) {
let algorithmQ = input.question("Which scoring algorithm would you like to use? \n" + 
"0 - Simple: One point per character \n" +2
"1 - Vowel Bonus: Vowels are worth 3 points \n" +
"2 - Scrabble: Uses scrabble point system \n" +
"Enter 0, 1, or 2: ")
// use return ...  then console log put in run program 
   switch(algorithmQ) {
      case "0": 
         return scoringAlgorithms[0].scorerFunction(word);
      
      case "1": 
         return scoringAlgorithms[1].scorerFunction(word);
        
      case "2": 
         return scoringAlgorithms[2].scorerFunction(word);
        
   }
}

function transform(oldPointStructure) {
   // using a for...in loop on an *object* will loop through the *keys*
   // NOTE: key will always be a string value when you refer to it
   for (key in oldPointStructure) {
      // Get the value which, in this case, is an array of
      // uppercase letters
      let arr = oldPointStructure[key]
      // using a for...in loop on an *array* will loop through the *index*
      for (index in arr) {
         let newKey = [arr[index].toLowerCase()]
         // parseInt() converts a string into a number
         // Creating a new key (lowercase letter) and set a value (Scrabble point)
         newPointStructure[newKey] = parseInt(key)
      }
   }
   return newPointStructure
};

let newPointStructure = {};

function runProgram() {
   console.log("scorerFunction result: ",initialPrompt());
}
//ran into the scrabbleScorer/scrabbleScore issue, but it was still //
// passing my test it but it the code wasn't working. It took me a minute until I read my notes, and there I
//jotted down the common error. 
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
