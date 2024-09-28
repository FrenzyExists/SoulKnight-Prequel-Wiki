const renderMain = () => {

    const mainContent = document.getElementById('main-content');

    const hero = document.createElement('section');

        // Add text to hero
        const heroText = document.createElement('h1');
        heroText.textContent = 'Welcome to the Hero Section';
        hero.appendChild(heroText);
        mainContent?.appendChild(hero)

    return mainContent
}

export default renderMain