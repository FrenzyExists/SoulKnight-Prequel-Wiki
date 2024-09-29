const renderFatebounds = async () => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch("http://localhost:3001/fatebound");
  const data = await response.json();

  if (data && !data.error) {
    const cardContainer = document.createElement("section");
    data.forEach((d) => {

      const card = document.createElement("article");
      card.classList.add("card");
      
      const wrapper = document.createElement('a');
      wrapper.href = `/fatebounds/${d.id}`
      wrapper.classList.add("card-wrapper")

      const cardImg = document.createElement("img");
      cardImg.src = d.img;
      cardImg.classList.add("cardImg");

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = d.name;

      card.appendChild(cardImg);
      card.appendChild(cardTitle);

      wrapper.appendChild(card)
      cardContainer.appendChild(wrapper);
    });
    mainContent?.appendChild(cardContainer);
  } else {
    const notFound = document.createElement('h2');
    notFound.textContent = 'Fatebounds are not found 😔';
    notFound.classList.add("not-found")
    mainContent.appendChild(notFound);
  }
  return mainContent;
};

export default renderFatebounds;

