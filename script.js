let points = 0;
let multiplier = 1;
let upgradeCost = 10;

const pointsDisplay = document.getElementById("points");
const multiplierDisplay = document.getElementById("multiplier");
const upgradeCostDisplay = document.getElementById("upgrade-cost");

document.getElementById("click-btn").addEventListener("click", () => {
  points += multiplier;
  updateUI();
});

document.getElementById("upgrade-btn").addEventListener("click", () => {
  if (points >= upgradeCost) {
    points -= upgradeCost;
    multiplier *= 2;
    upgradeCost *= 2;
    updateUI();
  } else {
    alert("Not enough points to upgrade!");
  }
});

function updateUI() {
  pointsDisplay.textContent = points;
  multiplierDisplay.textContent = multiplier;
  upgradeCostDisplay.textContent = upgradeCost;
}