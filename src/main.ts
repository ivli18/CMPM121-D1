import "./style.css";

let count = 0;
let growthRate = 0;
let lastTime = performance.now();

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
}

const upgrades: Upgrade[] = [
  { id: "A", name: "Bugs 🐜", cost: 10, rate: .1, count: 0 },
  { id: "B", name: "Worms 🪱", cost: 100, rate: 2, count: 0 },
  { id: "C", name: "Berries 🍓", cost: 1000, rate: 50, count: 0 },
];

let buttonsHTML = "";
let statusHTML = "";

for (const upgrade of upgrades) {
  buttonsHTML +=
    `<button id="buy-${upgrade.id}" disabled>Buy ${upgrade.name} (${upgrade.cost} lizards)</button>`;
  statusHTML +=
    `<div id="status-${upgrade.id}">${upgrade.name}: ${upgrade.count}</div>`;
}

document.body.innerHTML = `
  <button id="lbutton"> 🦎 </button>
  <div id="counter"> 0 lizards </div>

  ${buttonsHTML}
  <div id="growth">Growth rate: 0 /s</div>
  ${statusHTML}
`;

upgrades.forEach(listeners);
updateButtons();

function listeners(upgrade: Upgrade) {
  const button = document.getElementById(
    `buy-${upgrade.id}`,
  ) as HTMLButtonElement;

  button.addEventListener("click", () => {
    if (count >= upgrade.cost) {
      count -= upgrade.cost;
      upgrade.count++;
      growthRate += upgrade.rate;

      updateCounter();
      updateGrowthDisplay();
      updateButtons();
    }
  });
}

const button = document.getElementById("lbutton") as HTMLButtonElement;
const countDisplay = document.getElementById("counter") as HTMLDivElement;
const growthDisplay = document.getElementById("growth") as HTMLDivElement;

button.addEventListener("click", () => {
  count++;
  updateCounter();
  updateButtons();
});

function updateCounter() {
  countDisplay.textContent = `${count.toFixed(1)} lizards`;
}
function updateGrowthDisplay() {
  growthDisplay.textContent = `Growth rate: ${growthRate.toFixed(1)} /s`;
  for (const upgrade of upgrades) {
    const status = document.getElementById(`status-${upgrade.id}`);
    if (status) {
      status.textContent = `${upgrade.name}: ${upgrade.count}`;
    }
  }
}

function updateButtons() {
  for (const upgrade of upgrades) {
    const button = document.getElementById(
      `buy-${upgrade.id}`,
    ) as HTMLButtonElement;
    if (button) button.disabled = count < upgrade.cost;
  }
}

function update() {
  const now = performance.now();
  const time = now - lastTime;
  lastTime = now;

  count += growthRate * (time / 1000);
  updateCounter();
  updateButtons();
  requestAnimationFrame(update);
}

requestAnimationFrame(update);
