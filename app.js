const main = document.getElementById("main");
const movieSection = document.getElementById("movie__section");
const blob = document.getElementsByClassName("blob");
const addMovie = document.getElementById("create__new__card");
const addNewMovie = document.getElementById("new__movie__form");
const cards = document.getElementsByClassName("card");
const info = document.getElementById("info");
let isWatched = document.getElementsByClassName("status");
let delBtn = document.getElementsByClassName("trash-icon");
let library = [];

function Movie(title, director, release, genre, plot) {
  this.title = caseFix(title);
  this.director = caseFix(director);
  this.release = caseFix(release);
  this.genre = caseFix(genre);
  this.plot = caseFix(plot);
  this.watched = false;
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

function updateInfo(e) {
  const info = document.getElementById("info");

  function textOfCard(i) {
    const text = [...e.target.closest("div.card").children][i].textContent;
    return text;
  }

  const textOfInfo = (i, text) => {
    [...info.children][i].children[1].textContent = text;
  };

  for (i = 0; i <= 4; i++) {
    let j = i + 2;
    if (j >= 5) j++;
    const cardText = textOfCard(j);
    textOfInfo(i, cardText);
  }
}

function createCard(movie) {
  const card = createElem("div", "", ["card"]);
  {
    const readWrapper = createElem("div", "", ["cross-icon", "icon", "status"]);
    const read = createElem("i", "", ["fa-solid", "fa-x", "fa-xl"]);
    readWrapper.append(read);

    const notRead = createElem("i", "", [
      "fa-solid",
      "fa-x",
      "fa-xl",
      "cross-icon",
      "icon",
      "status",
    ]);

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

  movieSection.appendChild(card);

  [...delBtn].forEach((x) => {
    x.addEventListener("click", (e) => {
      let card = e.target.closest("div.card");
      card.classList.add("fade-out");
      setTimeout(() => card.remove(), 250);
    });
  });

  [...isWatched].forEach((x) => {
    x.addEventListener("click", (e) => {
      let parent = card.children[0];
      let svg = [...parent.children][0];

      parent.classList.toggle(["check-icon"]);
      parent.classList.toggle(["cross-icon"]);

      svg.classList.toggle(["fa-x"]);
      svg.classList.toggle(["fa-check"]);
    });
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

document.getElementById("submitForm").addEventListener("click", (e) => {
  e.preventDefault();
});

[...blob].forEach((x) => x.addEventListener("click", createNew));

[...cards].forEach((x) => {
  x.addEventListener("click", (e) => {
    updateInfo(e);
  });
});
