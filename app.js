const main = document.getElementById("main");
const movieSection = document.getElementById("movie__section");
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("create__new__card");
const addNewMovie = document.getElementById("new__movie__form");
let library = [];

function caseFix(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((x) => {
      if (typeof x === "string") return x.charAt(0).toUpperCase() + x.slice(1);
      return x;
    })
    .join(" ");
}

function Movie(title, director, release, genre, plot) {
  this.title = caseFix(title);
  this.director = caseFix(director);
  this.release = caseFix(release);
  this.genre = caseFix(genre);
  this.plot = caseFix(plot);
}

document.getElementById("submitForm").addEventListener("click", (e) => {
  e.preventDefault();
});

// Movie.prototype.getInfo
function fillDetails() {
  let title = document.getElementById("title").value;
  let director = document.getElementById("director").value;
  let release = document.getElementById("release").value;
  let genre = document.getElementById("genre").value;
  let plot = document.getElementById("plot").value;

  return new Movie(title, director, release, genre, plot);
}

function addToLibrary(movie) {
  console.log(movie.title);
  library.push(movie);
  createCard(movie);
}

function createCard(movie) {
  const card = createElem("div", "", "card");

  const title = createElem("h2", movie.title);
  const director = createElem("h2", `By ${movie.director}`);
  const plot = createElem("p", movie.plot);
  const hr = createElem("hr");
  const releaseDate = createElem("h3", movie.release);
  const genre = createElem("h3", movie.genre);

  card.append(title, director, plot, hr, releaseDate, genre);

  movieSection.appendChild(card);
}

function createElem(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;

  if (className) element.classList.add(className);

  return element;
}

function createNew(e) {
  if (e.target.id === "submitForm") {
    let movie = fillDetails();
    addToLibrary(movie);
  }

  main.classList.toggle("go__up");
  addMovie.classList.toggle("go__down");
  document.getElementById("body").classList.toggle("height100");
}

[...blob].forEach((e) => e.addEventListener("click", createNew));
