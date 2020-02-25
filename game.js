// Creating a giant wordGuessGame object that will house all of our logic and variables.
var wordGuessGame = {
  // Object of all words that can be chosen, along with info such as their picture and a song clip.
  wordsToPick: {
    lilnasx: {
      picture: "LilNasX.jpg",
      song: "Old Town Road",
      preview:
        <a src="../Word-Guess-Game/old_town_road.mp3"></a>
    },
    postmalone: {
      picture: "PostMaloneSwaeLee.jpg",
      song: "Sunflower",
      preview:
        "../Word-Guess-Game/sunflower.mp3"
    },
    khalid: {
      picture: "Khalid.jpg",
      song: "Talk",
      preview: "../Word-Guess-Game/talk.mp3"
        
    },
    postmalone: {
      picture: "PostMalone.jpg",
      song: "Wow.",
      preview:
      "../Word-Guess-Game/wow.mp3"
    },
    lizzo: {
      picture: "Lizzo.jpg",
      song: "Truth Hurts",
      preview:
      "../Word-Guess-Game/truth_hurts.mp3"
    },
    travisscott: {
      picture: "TravisScott.jpg",
      song: "Sicko Mode",
      preview:
      "../Word-Guess-Game/sicko_mode.mp3"
    },
    chrisbrown: {
      picture: "ChrisBrownDrake.jpg",
      song: "No Guidance",
      preview:
      "../Word-Guess-Game/no_guidance.mp3"
    },
    meekmill: {
      picture: "MeekMillDrake.jpg",
      song: "Going Bad",
      preview:
      "../Word-Guess-Game/going_bad.mp3"
    },
    liltecca: {
      picture: "LilTecca.jpg",
      song: "Ran$om",
      preview:
      "../Word-Guess-Game/ran$om.mp3"
    },
    dababy: {
      picture: "DaBaby.jpg",
      song: "Suge",
      preview:
      "../Word-Guess-Game/suge.mp3"
    }
  },

  
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

  setupGame: function() {
    var objKeys = Object.keys(this.wordsToPick);

    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    this.lettersOfTheWord = this.wordInPlay.split("");

    this.rebuildWordView();

    this.processUpdateTotalGuesses();
  },

  updatePage: function(letter) {
    if (this.guessesLeft === 0) {
      this.restartGame();
    } else {
      this.updateGuesses(letter);

      this.updateMatchedLetters(letter);

      this.rebuildWordView();

      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  updateGuesses: function(letter) {
    if (
      this.guessedLetters.indexOf(letter) === -1 &&
      this.lettersOfTheWord.indexOf(letter) === -1
    ) {
      this.guessedLetters.push(letter);

      this.guessesLeft--;

      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector(
        "#guessed-letters"
      ).innerHTML = this.guessedLetters.join(", ");
    }
  },

  processUpdateTotalGuesses: function() {
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  updateMatchedLetters: function(letter) {
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (
        letter === this.lettersOfTheWord[i] &&
        this.matchedLetters.indexOf(letter) === -1
      ) {
        this.matchedLetters.push(letter);
      }
    }
  },

  rebuildWordView: function() {
    var wordView = "";

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      } else {
        wordView += "&nbsp;_&nbsp;";
      }
    }

    document.querySelector("#current-word").innerHTML = wordView;
  },

  restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

  updateWins: function() {
    var win;

    if (this.matchedLetters.length === 0) {
      win = false;
    } else {
      win = true;
    }

    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    if (win) {
      this.wins = this.wins + 1;

      document.querySelector("#wins").innerHTML = this.wins;

      document.querySelector("#music").innerHTML =
        this.wordsToPick[this.wordInPlay].song + " By " + this.wordInPlay;

      document.querySelector("#band-div").innerHTML =
        "<img class='band-image' src='../assets/images" +
        this.wordsToPick[this.wordInPlay].picture +
        "' alt='" +
        this.wordsToPick[this.wordInPlay].song +
        "'>";

      var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
      audio.play();

      return true;
    }

    return false;
  }
};

wordGuessGame.setupGame();

document.onkeyup = function(event) {
  if (event.keyCode >= 49 && event.keyCode <= 90) {
    wordGuessGame.letterGuessed = event.key.toLowerCase();

    wordGuessGame.updatePage(wordGuessGame.letterGuessed);
  }
};
