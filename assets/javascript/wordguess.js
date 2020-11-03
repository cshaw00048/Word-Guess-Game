var disney = [
    "Snow White and the Seven Dwarfs",
    "One Hundred and One Dalmations",
    "Fantasia",
    "Cinderella",
    "Beauty and the Beast",
    "The Lion King",
    "The Little Mermaid",
    "The Princess and the Frog",
    "The Mighty Ducks",
    "Queen of Katwe",
    "Remember the Titans",
    "The Parent Trap",
    "Mary Poppins",
    "Old Yeller",
    "Ratatouille",
    "Inside Out",
    "Finding Nemo",
    "Toy Story",
    "Moana",
    "Frozen",
    "Zootopia",
    "Honey I Shrunk the Kids",
    "Homeward Bound",
    "Avengers",
    "Black Panther",
    "Coco",
    "Mulan"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];

function randomWord() {
    answer = disney_movie[Math.floor(Math.random() * disney_movie.length)];

    alert(answer);
}

randomWord();