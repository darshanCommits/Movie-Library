const movieSection = document.getElementById("main");
const fragment = document.createDocumentFragment();
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("createNew");

console.log([...blob]);

[...blob].forEach((e) => e.addEventListener("click", createNew));

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

// Movie.prototype.getInfo

const fightClub = new Movie(
  "Fight Club",
  "David Flincher",
  "Psychological",
  "Bradd Pitt",
  10
);

function createNew() {
  console.log("bruh");
  movieSection.classList.add("go__up");
  addMovie.classList.add("go__down");

  document.getElementById("body").classList.add("height100")

}
console.log([...movieSection.childNodes]);
