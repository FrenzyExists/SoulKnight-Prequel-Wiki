

const header = document.querySelector('header');

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';

const headerRight = document.createElement('div');
headerRight.className = 'header-right';

const headerTitle = document.createElement('h1');
headerTitle.textContent = "The Soul Knight Prequel Wiki";

const headerButton1 = document.createElement('Weapons');
const headerButton2 = document.createElement('Bosses');
const headerButton3 = document.createElement('Fatebound');
headerButton1.textContent = 'Weapons'
headerButton2.textContent = 'Bosses'
headerButton3.textContent = 'Fatebounds'

headerButton1.classList.add('homeBtn');
// homeBtnb
headerButton1.classList.add('homeBtnb');
headerButton2.classList.add('homeBtn');
headerButton2.classList.add('homeBtnb');
headerButton3.classList.add('homeBtn');

headerButton1.addEventListener('click', function handleClick(event) {
    window.location = '/weapons'
})

headerButton2.addEventListener('click', function handleClick(event) {
    window.location = '/bosses'
})

headerButton3.addEventListener('click', function handleClick(event) {
    window.location = '/fatebounds'
})


headerLeft.appendChild(headerTitle);

headerRight.appendChild(headerButton1);
headerRight.appendChild(headerButton2);
headerRight.appendChild(headerButton3);

headerContainer.appendChild(headerLeft);
headerContainer.appendChild(headerRight);

header?.appendChild(headerContainer)