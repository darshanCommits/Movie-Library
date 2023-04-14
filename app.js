const main = document.getElementById("main");
const movieSection = document.getElementById("movie__section");
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("create__new__card");
const addNewMovie = document.getElementById("new__movie__form");
let delBtn = document.getElementsByClassName("trash-icon");
let library = [];

function Movie(title, director, release, genre, plot) {
  this.title = caseFix(title);
  this.director = caseFix(director);
  this.release = caseFix(release);
  this.genre = caseFix(genre);
  this.plot = caseFix(plot);
}

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

function fillDetails() {
  let title = document.getElementById("title").value;
  let director = document.getElementById("director").value;
  let release = document.getElementById("release").value;
  let genre = document.getElementById("genre").value;
  let plot = document.getElementById("plot").value;

  return new Movie(title, director, release, genre, plot);
}

function createElem(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.classList.add(...className);
  return element;
}

function createCard(movie) {
  const card = createElem("div", "", ["card"]);

  const trashWrapper = createElem("div", "", ["trash-icon"]);
  const trash = createElem("i", "", ["fa-solid", "fa-trash-can", "fa-xl"]);

  const title = createElem("h2", movie.title);
  const director = createElem("h2", `By ${movie.director}`);
  const plot = createElem("p", movie.plot);
  const hr = createElem("hr");
  const releaseDate = createElem("h3", movie.release);
  const genre = createElem("h3", movie.genre);

  trashWrapper.append(trash);
  card.append(trashWrapper, title, director, plot, hr, releaseDate, genre);
  movieSection.appendChild(card);

  trashWrapper.addEventListener("click", () => {
    card.classList.add("fade-out");
    setTimeout(() => card.remove(), 250);
  });


}

function addToLibrary(movie) {
  library.push(movie);
  createCard(movie);
}

function createNew(e) {
  if (e.target.id === "submitForm") {
    addToLibrary(fillDetails());
  }

  main.classList.toggle("go__up");
  addMovie.classList.toggle("go__down");
  document.getElementById("body").classList.toggle("height100");
}

[...blob].forEach((e) => e.addEventListener("click", createNew));

document.getElementById("submitForm").addEventListener("click", (e) => {
  e.preventDefault();
});

[...delBtn].forEach((x) => {
  console.log(delBtn);
  x.addEventListener("click", (e) => {
    console.log(23);
    let card = e.target.closest("div.card");

    card.classList.add("fade-out");
    setTimeout(() => card.remove(), 250);
  });
});
