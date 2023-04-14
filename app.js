const main = document.getElementById("main");
const movieSection = document.getElementById("movie__section");
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("create__new__card");
const addNewMovie = document.getElementById("new__movie__form");
let library = [];

function Movie(title, director, genre) {
  this.title = title;
  this.director = director;
  this.genre = genre;
}

document.getElementById("submitForm").addEventListener("click", (e) => {
  e.preventDefault();
});

// Movie.prototype.getInfo
function fillDetails() {
  let title = document.getElementById("title").value;
  let director = document.getElementById("director").value;
  let genre = document.getElementById("genre").value;

  return new Movie(title, director, genre);
}

function addToLibrary(movie) {
  console.log(movie.title);
  library.push(movie);
  createCard(movie);
}

function createCard(movie) {
  const card = createElem("div", "", "card");

  const title = createElem("h2", movie.title);
  const director = createElem("h2", movie.director);
  console.log(movie.director);

  const hr = createElem("hr");
  const genre = createElem("h2", movie.genre);

  card.append(title, director, hr, genre);

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
