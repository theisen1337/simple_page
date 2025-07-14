let points = 0;
let clickMultiplier = 1;
let autoClickRate = 0;

const pointsDisplay = document.getElementById("points");
const multiplierDisplay = document.getElementById("multiplier");
const upgradeContainer = document.getElementById("upgrade-buttons");

// Load game from localStorage
function loadGame() {
  const saved = localStorage.getItem("clickerSave");
  if (!saved) return;

  const game = JSON.parse(saved);
  points = game.points;
  clickMultiplier = game.clickMultiplier;
  autoClickRate = game.autoClickRate;

  upgradesData.forEach((upgrade, index) => {
    upgrade.level = game.upgrades[index].level;
  });
}

// Save game to localStorage
function saveGame() {
  const game = {
    points,
    clickMultiplier,
    autoClickRate,
    upgrades: upgradesData.map(u => ({ level: u.level }))
  };
  localStorage.setItem("clickerSave", JSON.stringify(game));
}

// Auto-save every 5 seconds
setInterval(saveGame, 5000);

// Manual click
document.getElementById("click-btn").addEventListener("click", () => {
  points += clickMultiplier;
  updateUI();
  checkAchievements();
});

// UI update
function updateUI() {
  pointsDisplay.textContent = Math.floor(points);
  multiplierDisplay.textContent = clickMultiplier;
}

// Passive income
setInterval(() => {
  points += autoClickRate;
  updateUI();
  checkAchievements();
}, 1000);

// Cost calculator
function getUpgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level));
}

// Render buttons
function renderUpgrades() {
  upgradeContainer.innerHTML = "";

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
        checkAchievements();
      } else {
        alert("Not enough points!");
      }
    });

    updateButtonLabel();
    upgradeContainer.appendChild(button);
  });
}

// 🏆 Achievement system
function checkAchievements() {
  if (points >= 1000 && !localStorage.getItem("achv_1000pts")) {
    alert("🏆 Achievement: 1,000 points!");
    localStorage.setItem("achv_1000pts", true);
  }

  if (clickMultiplier >= 10 && !localStorage.getItem("achv_10x")) {
    alert("🏆 Achievement: 10x Click Power!");
    localStorage.setItem("achv_10x", true);
  }

  if (autoClickRate >= 5 && !localStorage.getItem("achv_autoclick5")) {
    alert("🏆 Achievement: 5 Auto-Click Power!");
    localStorage.setItem("achv_autoclick5", true);
  }
}

function resetGame() {
  if (confirm("Reset all progress?")) {
    localStorage.removeItem("clickerSave");
    location.reload();
  }
}

// Init
loadGame();
renderUpgrades();
updateUI();