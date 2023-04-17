const aside = document.getElementById("aside");
const root = document.documentElement;


aside.addEventListener("click", () => {
  root.style.setProperty("--info-width", `20rem`);
})
