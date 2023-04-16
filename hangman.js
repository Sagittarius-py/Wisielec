const words = require("./words.json");

// Funkcja zwracająca losowe słowo z tablicy słów
function randomWord(category = "trudneSlowa") {
  const index = Math.floor(Math.random() * 3);
  category = category.kategoria;
  if ((category = "Przysłowia")) {
    category = "przyslowia";
  }
  if ((category = "Trudne słowa")) {
    category = "trudneSlowa";
  }
  if ((category = "Tytuły filmów")) {
    category = "tytulyFilmow";
  }

  console.log(words.words[category][index]);
  return words.words[category][index].toLowerCase();
}

function checkLetter(word, letter) {
  return word.includes(letter);
}

module.exports = { randomWord, checkLetter };
