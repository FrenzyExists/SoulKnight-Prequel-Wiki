
const renderNotFound = async() => {
    const mainContent = document.getElementById('main-content');
    const notFoundT = document.createElement('h1')
    notFoundT.textContent = "404 Welcome to the Void"
    const toHome = document.createElement('a')
    toHome.textContent = 'Come back Home'
    toHome.href = '/'
    const notFound = document.createElement('div');
    notFound.classList.add('not-found')
    notFound?.appendChild(notFoundT);
    notFound?.appendChild(toHome)
    mainContent?.appendChild(notFound);

    return mainContent;
}

export default renderNotFound;