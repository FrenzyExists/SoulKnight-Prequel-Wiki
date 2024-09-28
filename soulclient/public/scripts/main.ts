import { handleNavigation } from "./router";

document.addEventListener("DOMContentLoaded", () => {
    handleNavigation(window.location.pathname);
    window.onpopstate = () => handleNavigation(window.location.pathname);
  });
