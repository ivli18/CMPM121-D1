import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let count = 0;


document.body.innerHTML = `
  <button id="lbutton"> 🦎
  <div id="counter"> 0 lizards </div>

`;

const button = document.getElementById("lbutton") as HTMLButtonElement;
const countDisplay = document.getElementById("counter") as HTMLDivElement;

button.addEventListener("click", () => {
  count++;
  countDisplay.textContent = `${count} lizards`;
});

let lastTime = performance.now()

function update() {
  const current = performance.now();
  const time = current - lastTime;
  count += time / 1000;

  lastTime = current;
  countDisplay.textContent = `${count.toFixed(1)} lizards`;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);