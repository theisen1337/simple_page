let points = 0;
let multiplier = 1;

const pointsDisplay = document.getElementById("points");
const multiplierDisplay = document.getElementById("multiplier");
const upgradeContainer = document.getElementById("upgrade-buttons");

document.getElementById("click-btn").addEventListener("click", () => {
  points += multiplier;
  updateUI();
});

function updateUI() {
  pointsDisplay.textContent = points;
  multiplierDisplay.textContent = multiplier;
}

// Now use the upgradesData directly
upgradesData.forEach(upgrade => {
  const button = document.createElement("button");
  button.textContent = `${upgrade.label} (Cost: ${upgrade.cost})`;
  button.id = upgrade.id;
  button.classList.add("upgrade-btn");

  button.addEventListener("click", () => {
    if (points >= upgrade.cost) {
      points -= upgrade.cost;
      multiplier *= upgrade.multiplier;
      updateUI();
      button.disabled = true;
    } else {
      alert("Not enough points!");
    }
  });

  upgradeContainer.appendChild(button);
});