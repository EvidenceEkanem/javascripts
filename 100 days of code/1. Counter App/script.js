let count = document.querySelector(".count");
let buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (e) => {
  if(e.target.classList.contains("add")){
    count.innerText++;
    changeColor();
  }else if(e.target.classList.contains("subtract")){
    count.innerText--;
    changeColor();
  }else{
    count.innerText = 0;
    changeColor();
  }
})

const changeColor = () => {
  if(count.innerText < 0){
    count.style.color = "orangered";
  }else if(count.innerText > 0){
    count.style.color = "yellow";
  }else{
    count.style.color = "white";
  }
}