const renderWeapons = async () => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch("http://localhost:3001/weapon");
  const data = await response.json();

  if (data && !data.error) {
    const cardContainer = document.createElement("section");
    data.forEach((d) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const innerCard = document.createElement("div");
      innerCard.classList.add("cardMain");

      const cardImg = document.createElement("img");
      cardImg.src = d.img;
      cardImg.classList.add("cardImg");

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = d.name;

      const hr = document.createElement("hr");

      const cardInfo = document.createElement("div");
      cardInfo.classList.add("cardInfo");

      const fatebound1 = document.createElement("a");
      fatebound1.href = `/fatebound/${d.main_fatebound}`;
      fatebound1.textContent = "Fatebound 1";

      const fatebound2 = document.createElement("a");
      fatebound2.href = `/fatebound/${d.secondary_fatebound}`;
      fatebound2.textContent = "Fatebound 2";

      cardInfo.appendChild(fatebound1);
      cardInfo.appendChild(fatebound2);

      innerCard.appendChild(cardImg);
      innerCard.appendChild(cardTitle);
      innerCard.appendChild(hr);
      innerCard.appendChild(cardInfo);

      card.appendChild(innerCard);
      cardContainer.appendChild(card);
    });

    mainContent?.appendChild(cardContainer);
  } else {
    const nope = document.createElement("h2");
    nope.textContent = "Not found 😔";
    mainContent?.appendChild(nope);
  }
  return mainContent;
};

export default renderWeapons;
