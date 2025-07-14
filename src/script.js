let points = 0;
let clickMultiplier = 1;
let autoClickRate = 0; // points per second

const pointsDisplay = document.getElementById("points");
const multiplierDisplay = document.getElementById("multiplier");
const upgradeContainer = document.getElementById("upgrade-buttons");

document.getElementById("click-btn").addEventListener("click", () => {
  points += clickMultiplier;
  updateUI();
});

function updateUI() {
  pointsDisplay.textContent = Math.floor(points);
  multiplierDisplay.textContent = clickMultiplier;
}

// Add auto-click interval
setInterval(() => {
  points += autoClickRate;
  updateUI();
}, 1000); // every second

// Utility to calculate current upgrade cost
function getUpgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level));
}

// Dynamically create upgrade buttons
upgradesData.forEach(upgrade => {
  const button = document.createElement("button");
  button.id = upgrade.id;
  button.classList.add("upgrade-btn");

  const updateButtonLabel = () => {
    const cost = getUpgradeCost(upgrade);
    button.textContent = `${upgrade.label} (Lvl ${upgrade.level}) - Cost: ${cost}`;
  };

  button.addEventListener("click", () => {
    const cost = getUpgradeCost(upgrade);
    if (points >= cost) {
      points -= cost;
      upgrade.level++;

      if (upgrade.type === "click") {
        clickMultiplier += upgrade.power;
      } else if (upgrade.type === "auto") {
        autoClickRate += upgrade.power;
      }

      updateButtonLabel();
      updateUI();
    } else {
      alert("Not enough points!");
    }
  });

  updateButtonLabel();
  upgradeContainer.appendChild(button);
});