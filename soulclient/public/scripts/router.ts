import renderNotFound from "./404.ts";
import renderFatebounds from "./fatebound.ts";
// import renderBoss from "./boss.ts";
import renderMain from "./home.ts";
import renderWeapons from "./weapon.ts";



const routes = {
    "/": renderMain,
    "/weapons": renderWeapons,
    "/fatebounds": renderFatebounds,
    // "/boss": renderBoss,
    // "/armor": renderArmor
  };

  // Function to handle navigation
export const handleNavigation = (path) => {
    const renderFunction = routes[path] || renderNotFound; // Default to 404 if route not found
    document.getElementById('main-content').innerHTML = ''; // Clear main content
    renderFunction();
    window.history.pushState({}, "", path );
  };
  
  // Handle back/forward browser navigation
  window.onpopstate = () => {
    handleNavigation(window.location.pathname);
  };
  
  // Initial load
  document.addEventListener("DOMContentLoaded", () => {
    handleNavigation(window.location.pathname);
  });