let count = 0;
let growthRate = 0;
let lastTime = performance.now();
let clickPower = 1;

interface Item {
  id: string;
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    id: "clickUpgrade",
    name: "Efficient Harvesting 💪",
    cost: 50,
    rate: 0,
    description: "Strong arms! (More 🍌 per click!)",
  },
  {
    id: "wormUpgrade",
    name: "Tasty Compost 🪱",
    cost: 10,
    rate: 0.1,
    description: "Richer soil! (+0.1🍌/s)",
  },
  {
    id: "monkeyUpgrade",
    name: "Monkey Worker 🐒",
    cost: 100,
    rate: 2,
    description: "Picks nonstop! (+2🍌/s)",
  },
  {
    id: "treeUpgrade",
    name: "Banana Tree 🌳",
    cost: 1000,
    rate: 50,
    description: "Produces fast! (+50🍌/s)",
  },
  {
    id: "magicUpgrade",
    name: "Growth Enhancer 🪄",
    cost: 5000,
    rate: 500,
    description: "Magic speed! (+500🍌/s)",
  },
];

const style = document.createElement("style");
style.textContent = `
  body { text-align: center; font-family: sans-serif; margin: 20px; background-color: #fff1b8; }
  #lbutton {
    font-size: 4rem; padding: 40px 60px; margin: 20px auto;
    border: none; border-radius: 50%;
    background: linear-gradient(145deg, #ffdb4d, #ffa84d);
    color: #5e3c00; cursor: pointer;
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    transition: transform 0.1s, box-shadow 0.1s;
  }
  #lbutton:hover { transform: scale(1.05); box-shadow: 0 8px 16px rgba(0,0,0,0.3); }
  #lbutton:active { transform: scale(0.95); }
  #counter, #growth { font-size: 1.5em; margin: 10px 0; font-weight: bold; }
  button {
    margin: 8px; padding: 10px 20px;
    cursor: pointer; background: #f0f0f0;
    border: 1px solid #ccc; border-radius: 6px;
  }
  .item-desc { font-size: 0.75em; color: #555; }
  .item-cost { font-size: 0.8em; color: #333; }
`;
document.head.appendChild(style);

const container = document.createElement("div");
document.body.appendChild(container);

const lbutton = Object.assign(document.createElement("button"), {
  id: "lbutton",
  innerHTML: "🍌",
});
const countDisplay = Object.assign(document.createElement("div"), {
  id: "counter",
});
const growthDisplay = Object.assign(document.createElement("div"), {
  id: "growth",
});

container.append(lbutton, countDisplay, growthDisplay);

availableItems.forEach((item) => {
  const button = document.createElement("button");
  button.id = `buy-${item.id}`;
  button.disabled = true;
  button.innerHTML = `
    <div style="text-align:center">
      <div><strong>${item.name}</strong></div>
      <div class="item-desc">${item.description}</div>
      <div class="item-cost">Cost: ${item.cost.toFixed(1)} 🍌</div>
    </div>
  `;
  container.appendChild(button);

  button.addEventListener("click", () => {
    if (count >= item.cost) {
      count -= item.cost;
      if (item.id === "clickUpgrade") {
        clickPower += 1;
        item.cost *= 1.10;
      } else {
        growthRate += item.rate;
        item.cost *= 1.15;
      }
      updateCounter();
      updateGrowth();
      updateButtons();
    }
  });
});

lbutton.addEventListener("click", () => {
  count += clickPower;
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
      const costElem = button.querySelector(".item-cost");
      if (costElem) costElem.textContent = `Cost: ${item.cost.toFixed(1)} 🍌`;
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
