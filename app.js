const express = require("express");
const session = require("express-session");
const hbs = require("express-hbs");
const path = require("path");
const { randomWord, checkLetter } = require("./hangman");

const app = express();

// Ustawienia silnika szablonów Handlebars
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware dla obsługi formularzy
app.use(express.urlencoded({ extended: true }));

// Middleware dla obsługi sesji
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware dla plików statycznych
app.use(express.static(path.join(__dirname, "public")));

// Endpoint dla strony głównej
app.get("/", (req, res) => {
  console.log(req.session.word);
  if (!req.session.word) {
    req.session.word = randomWord();
  }
  const word = req.session.word;
  const guesses = req.session.guesses || [];
  const wrongGuesses = req.session.wrongGuesses || 0;

  console.log(word);

  const maskedWord = word
    .split("")
    .map((letter) => {
      return guesses.includes(letter) ? letter : "_";
    })
    .join(" ");

  const context = {
    maskedWord,
    guesses,
    wrongGuesses,
    gameover: wrongGuesses >= 6 || maskedWord.indexOf("_") === -1,
  };

  res.render("home", context);
});

app.post("/category", (req, res) => {
  req.session.word = randomWord(req.body);
  res.redirect("/");
});

// Endpoint dla obsługi żądania POST
app.post("/play", (req, res) => {
  const letter = req.body.letter.toLowerCase();
  const word = req.session.word;
  const guesses = req.session.guesses || [];
  const wrongGuesses = req.session.wrongGuesses || 0;

  if (guesses.includes(letter)) {
    req.session.message = "Ta litera została już użyta. Spróbuj ponownie.";
  } else {
    const result = checkLetter(word, letter);
    if (result) {
      req.session.guesses = [...guesses, letter];
    } else {
      req.session.wrongGuesses = wrongGuesses + 1;
    }
  }

  res.redirect("/");
});

// Start serwera
app.listen(3000, () => {
  console.log("Serwer został uruchomiony na porcie 3000.");
});
