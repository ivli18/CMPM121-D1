import "./style.css";

let count = 0;
let growthRate = 0;
let lastTime = performance.now();

document.body.innerHTML = `
  <button id="lbutton"> 🦎
  <div id="counter"> 0 lizards </div>

  <button id="growthUp" disabled>⬆️ Buy Auto-Click (10 lizards)</button>
  <div id="growth">Growth rate: 0 /s</div>

`;

const button = document.getElementById("lbutton") as HTMLButtonElement;
const countDisplay = document.getElementById("counter") as HTMLDivElement;

const growthButton = document.getElementById("growthUp") as HTMLButtonElement;
const growthDisplay = document.getElementById("growth") as HTMLDivElement;

button.addEventListener("click", () => {
  count++;
  countDisplay.textContent = `${count} lizards`;
});

growthButton.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10;
    growthRate += 1;
    updateCounter();
    updateGrowthDisplay();
  }
});

function updateCounter() {
  countDisplay.textContent = `${count.toFixed(1)} lizards`;
  if (count >= 10) {
    growthButton.disabled = false;
  } else {
    growthButton.disabled = true;
  }
}
function updateGrowthDisplay() {
  growthDisplay.textContent = `Growth rate: ${growthRate} /s`;
}

function update() {
  const now = performance.now();
  const time = now - lastTime;
  lastTime = now;

  count += growthRate * (time / 1000);
  updateCounter();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
