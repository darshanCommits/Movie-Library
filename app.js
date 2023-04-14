const movieSection = document.getElementById("main");
const fragment = document.createDocumentFragment();
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("create__new__card");
const addNewMovie = document.getElementById("new__movie__form");

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

function fillDetails(movieName) {
  const details = ["name", "author", "genre", "cast", "rating"];

  let i = 0;
  for (const detail of details) {
    this.detail = addNewMovie[i].value;
    i++;
  }

  return movieName;
}

let bruh = fillDetails("bruh");

function createNew() {
  movieSection.classList.toggle("go__up");
  addMovie.classList.toggle("go__down");
  document.getElementById("body").classList.toggle("height100");
  console.log(addNewMovie[0].value);
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
