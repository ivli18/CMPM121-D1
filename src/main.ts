let count = 0;
let growthRate = 0;
let lastTime = performance.now();

interface Item {
  id: string;
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { id: "A", name: "Tasty Compost 🪱", cost: 10, rate: 0.1 },
  { id: "B", name: "Monkey Worker 🐒", cost: 100, rate: 2 },
  { id: "C", name: "Banana Tree 🌳", cost: 1000, rate: 50 },
];

const style = document.createElement("style");
style.textContent = `
  body {
    text-align: center;
    font-family: sans-serif;
    margin: 20px;
  }
  #lbutton {
    font-size: 4rem;
    padding: 40px 60px;
    margin: 20px auto;
    border: none;
    border-radius: 50%;
    background: linear-gradient(145deg, #ffdb4d, #ffa84d);
    color: #5e3c00;
    cursor: pointer;
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    transition: transform 0.1s, box-shadow 0.1s;
  }
  #lbutton:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }
  #lbutton:active {
    transform: scale(0.95);
  }
  #counter, #growth {
    font-size: 1.5em;
    margin: 10px 0;
    font-weight: bold;
  }
  button {
    margin: 8px;
    padding: 10px 20px;
  }
`;
document.head.appendChild(style);

const container = document.createElement("div");
document.body.appendChild(container);

const lbutton = Object.assign(document.createElement("button"), {
  id: "lbutton",
  innerHTML: "🍌",
});
container.appendChild(lbutton);

const countDisplay = Object.assign(document.createElement("div"), {
  id: "counter",
});
countDisplay.textContent = "0 🍌";
container.appendChild(countDisplay);

const growthDisplay = Object.assign(document.createElement("div"), {
  id: "growth",
});
growthDisplay.textContent = "+0 🍌/sec";
container.appendChild(growthDisplay);

// Create buttons for all items
availableItems.forEach((item) => {
  const button = Object.assign(document.createElement("button"), {
    id: `buy-${item.id}`,
  });
  button.disabled = true;
  button.innerHTML = `
    <div style="text-align:center">
      <div><strong>${item.name}</strong></div>
      <div style="font-size:0.8em">Cost: ${item.cost.toFixed(1)} 🍌</div>
    </div>
  `;
  container.appendChild(button);

  button.addEventListener("click", () => {
    if (count >= item.cost) {
      count -= item.cost;
      growthRate += item.rate;
      item.cost *= 1.15;
      updateCounter();
      updateGrowth();
      updateButtons();
    }
  });
});

lbutton.addEventListener("click", () => {
  count++;
  updateCounter();
  updateButtons();
});

function updateCounter() {
  countDisplay.textContent = `${count.toFixed(1)} 🍌`;
}

function updateGrowth() {
  growthDisplay.textContent = `+${growthRate.toFixed(1)} 🍌/sec`;
}

function updateButtons() {
  availableItems.forEach((item) => {
    const button = document.getElementById(
      `buy-${item.id}`,
    ) as HTMLButtonElement;
    if (button) {
      button.disabled = count < item.cost;
      const costLine = button.querySelector("div > div:last-child");
      if (costLine) costLine.textContent = `Cost: ${item.cost.toFixed(1)} 🍌`;
    }
  });
}

function gameLoop() {
  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;
  count += growthRate * dt;
  updateCounter();
  updateButtons();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
