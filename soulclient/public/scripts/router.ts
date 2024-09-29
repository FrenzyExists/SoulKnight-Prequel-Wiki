import renderNotFound from "./404.ts";
import renderFatebound from "./fatebound.ts";
import renderFatebounds from "./fatebounds.ts";
// import renderBoss from "./boss.ts";
import renderMain from "./home.ts";
import renderWeapon from "./weapon.ts";
import renderWeapons from "./weapons.ts";

const routes = {
  "/": renderMain,
  "/weapons": renderWeapons,
  "/fatebounds": renderFatebounds,
  // "/boss": renderBoss,
  // "/armor": renderArmor
};

// Function to handle navigation
export const handleNavigation = (path) => {
  document.getElementById("main-content").innerHTML = ""; // Clear main content

  const fateboundMatch = path.match(/^\/fatebounds\/(\d+)$/);
  const bossMatch = path.match(/^\/bosses\/(\d+)$/);
  const armorMatch = path.match(/^\/armors\/(\d+)$/);
  const weapondMatch = path.match(/^\/weapons\/(\d+)$/);

  if (fateboundMatch) {
    const id = fateboundMatch[1]; // Extract the ID from the path
    renderFatebound(id); // Render individual fatebound page
    window.history.pushState({}, "", path);
    return;
  }
  console.log(weapondMatch);
  
  if(weapondMatch) {
    const id = weapondMatch[1];
    renderWeapon(id);
    window.history.pushState({}, "", path);
  }

  const renderFunction = routes[path] || renderNotFound; // Default to 404 if route not found

  renderFunction();
  window.history.pushState({}, "", path);
};

// Handle back/forward browser navigation
window.onpopstate = () => {
  handleNavigation(window.location.pathname);
};

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  handleNavigation(window.location.pathname);
});
