const renderWeapons = async () => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch("http://localhost:3001/weapon");
  const data = await response.json();

  if (data && !data.error) {
    const cardContainer = document.createElement("section");
    data.forEach((d) => {
      const card = document.createElement("article");
      card.classList.add("card");

      const wrapper = document.createElement('a');
      wrapper.href = `/weapons/${d.id}`
      wrapper.classList.add("card-wrapper")

      const cardImg = document.createElement("img");
      cardImg.src = d.img;
      cardImg.classList.add("cardImg");

      const fatebound1 = document.createElement("a");
      fatebound1.href = `/fatebound/${d.main_fatebound}`;
      const fatebound1Img = document.createElement("img");
      fatebound1Img.alt = "Main FB"
      if (d.main_fatebound) {
        fatebound1.href = d.main_fatebound;
      }
      fatebound1.appendChild(fatebound1Img);

      const fatebound2 = document.createElement("a");
      fatebound2.href = `/fatebound/${d.secondary_fatebound}`;
      const fatebound2Img = document.createElement("img");
      fatebound2Img.alt = "Second FB"
      if (d.secondary_fatebound) {
        fatebound2.href = d.secondary_fatebound;
      }
      fatebound2.appendChild(fatebound2Img);

      const fbContainer = document.createElement('div');
      fbContainer.classList.add('fb_container');
      
      fbContainer.appendChild(fatebound1);
      fbContainer.appendChild(fatebound2);

      // innerCard.appendChild(cardImg);
      // innerCard.appendChild(cardTitle);
      // innerCard.appendChild(hr);
      // innerCard.appendChild(cardInfo);

      
      // cardContainer.appendChild(card);

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = d.name;

      card.appendChild(cardImg);
      card.appendChild(fbContainer);
      card.appendChild(cardTitle);

      wrapper.appendChild(card)
      cardContainer.appendChild(wrapper);
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
