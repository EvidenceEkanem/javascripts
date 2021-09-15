let display = document.querySelector(".count");
let generate = document.querySelector(".generate");

generate.addEventListener("click", () => {
  let randNumber = Math.floor(Math.random() * 10 + 1);
  display.innerText = randNumber;
});