const movieSection = document.getElementById("main");
const fragment = document.createDocumentFragment();
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("createNew");
const addNewMovie = document.getElementById("newMovie");

console.log(addNewMovie[0]);


function Movie(name, author, genre, cast, rating) {
  this.name = name;
  this.author = author;
  this.genre = genre;
  this.cast = cast;
  this.rating = rating;

  this.getInfo = () => {
    console.log(
      `${this.name} is a ${this.genre} movie directed by ${this.author} and I rate it ${this.rating}.`
    );
  };
}
function createNew() {
    movieSection.classList.toggle("go__up");
    addMovie.classList.toggle("go__down");
    document.getElementById("body").classList.toggle("height100");
  }

// Movie.prototype.getInfo

const fightClub = new Movie(
  "Fight Club",
  "David Flincher",
  "Psychological",
  "Bradd Pitt",
  10
);



[...blob].forEach((e) => e.addEventListener("click", createNew));
