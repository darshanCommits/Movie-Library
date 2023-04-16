const main = document.getElementById("main");
const movieSection = document.getElementById("movie__section");
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("create__new__card");
const addNewMovie = document.getElementById("new__movie__form");
const cards = document.getElementsByClassName("card");
const info = document.getElementById("info");
const delBtn = document.getElementsByClassName("trash-icon");
const aside = document.getElementById("aside");
const root = document.documentElement;
const mediaQuery = window.matchMedia("(max-width: 530px)");
let library = [];

function Movie(title, director, release, genre, plot) {
  this.title = caseFix(title);
  this.director = caseFix(director);
  this.release = caseFix(release);
  this.genre = caseFix(genre);
  this.plot = caseFix(plot);
  this.read = false;
}

function getMovieObjectWithCardIndex(card) {
  const index = card.dataset.index;
  return library[index];
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
  const title = document.getElementById("title").value;
  const director = document.getElementById("director").value;
  const release = document.getElementById("release").value;
  const genre = document.getElementById("genre").value;
  const plot = document.getElementById("plot").value;

  return new Movie(title, director, release, genre, plot);
}

function createElem(tag, text, className) {
  const element = document.createElement(tag);
  if (text) element.textContent = text;
  if (className) element.classList.add(...className);
  return element;
}

function addToLibrary(movie) {
  library.push(movie);
  createCard(movie, library.length - 1);
}

function createNew(e) {
  if (e.target.id === "submitForm") {
    addToLibrary(fillDetails());
  }
  main.classList.toggle("go__up");
  addMovie.classList.toggle("go__down");
  document.getElementById("body").classList.toggle("height100");
}

function createCard(movie, index) {
  const card = createElem("div", "", ["card"]);
  {
    const readWrapper = createElem("div", "", ["cross-icon", "icon", "status"]);
    const read = createElem("i", "", ["fa-solid", "fa-x", "fa-xl"]);
    readWrapper.append(read);

    const trashWrapper = createElem("div", "", ["trash-icon", "icon"]);
    const trash = createElem("i", "", ["fa-solid", "fa-trash-can", "fa-xl"]);
    trashWrapper.append(trash);

    const title = createElem("h2", movie.title, ["title"]);
    const director = createElem("h2", `By ${movie.director}`, ["director"]);
    const plot = createElem("p", movie.plot, ["plot"]);
    const hr = createElem("hr");
    const releaseDate = createElem("h3", movie.release, ["release"]);
    const genre = createElem("h3", movie.genre, ["genre"]);

    card.append(
      readWrapper,
      trashWrapper,
      title,
      director,
      plot,
      hr,
      releaseDate,
      genre
    );
  }
  card.dataset.index = index;

  movieSection.appendChild(card);
}

function updateInfo(e, card) {
  const info = document.getElementById("info");
  const movie = getMovieObjectWithCardIndex(card);
  const textOfInfo = (i, text) => {
    [...info.children][i].children[1].textContent = text;
  };

  for (let i = 0; i <= 5; i++) {
    const cardText = Object.values(movie)[i];
    textOfInfo(i, cardText);
  }
}

function deleteFn(e) {
  const card = e.target.closest("div.card");
  card.classList.add("fade-out");
  setTimeout(() => card.remove(), 250);
}

function toggleRead(card) {
  const parent = card.children[0];
  const svg = [...parent.children][0];

  const movie = getMovieObjectWithCardIndex(card);
  movie.read = !movie.read;

  console.log(movie);

  parent.classList.toggle("check-icon");
  parent.classList.toggle("cross-icon");

  svg.classList.toggle("fa-x");
  svg.classList.toggle("fa-check");
}

function mobileAside() {
  root.classList.toggle("mobile-yes-open");
  root.classList.toggle("mobile-not-open");
  root.style.setProperty(
    "--info-width",
    infoWidth !== "20rem" ? "20rem" : "2rem"
  );
}

document.getElementById("submitForm").addEventListener("click", (e) => {
  e.preventDefault();
});

[...blob].forEach((x) => x.addEventListener("click", createNew));

document.body.addEventListener("click", (e) => {
  const card = e.target.closest("div.card");

  if (e.target.closest(".fa-trash-can")) {
    deleteFn(e);
  } else if (e.target.closest(".status")) {
    toggleRead(card);
  } else if (e.target.closest(".card")) {
    updateInfo(e, card);
  }
});

aside.addEventListener("click", () => {
  if (mediaQuery.matches) {
    mobileAside();
  }
});
