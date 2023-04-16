const words = require("./words.json");

// Funkcja zwracająca losowe słowo z tablicy słów
function randomWord(category = 0) {
  const index = Math.floor(Math.random() * 3);
  console.log(category);
  console.log(words.words[category]);
  return words.words[category][index].toLowerCase();
}

function checkLetter(word, letter) {
  return word.includes(letter);
}

module.exports = { randomWord, checkLetter };
