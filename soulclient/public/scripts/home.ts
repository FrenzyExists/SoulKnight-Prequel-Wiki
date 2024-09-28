const renderMain = async () => {

    const mainContent = document.getElementById('main-content');
    
    // Create hero section
    const hero = document.createElement('section');
    hero.classList.add('hero-section');
    
    // Add text to hero
    const heroText = document.createElement('h1');
    heroText.textContent = 'Welcome to the SKP Wiki!';
    const heroSmallerText = document.createElement('h3');
    heroSmallerText.textContent = "For my fellow minmax mages"
    hero.classList.add('hero-text');
    hero.appendChild(heroText);
    hero.appendChild(heroSmallerText);


    // Append hero to mainContent
    mainContent?.appendChild(hero);
    return mainContent;
}
export default renderMain