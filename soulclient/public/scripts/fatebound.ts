const renderFatebounds = async () => {
  const mainContent = document.getElementById("main-content");

  const response = await fetch("http://localhost:3001/fatebound");
  const data = await response.json();

  if (data && !data.error) {
    const cardContainer = document.createElement("section");
    data.forEach((d) => {
    //   const card = document.createElement("div");
    // card.classList.add('article-wrapper');
    //   const cardImgContainer = document.createElement("figure");
    //   const cardImg = document.createElement("img");
    //   cardImg.src = d.img;

    //   cardImgContainer.appendChild(cardImg);

    //   const cardTitle = document.createElement("h2");
    //   cardTitle.textContent = d.name;

      const card = document.createElement("div");
      card.classList.add("card");

      const cardImg = document.createElement("img");
      cardImg.src = d.img;
      cardImg.classList.add("cardImg");

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = d.name;

      card.appendChild(cardImg);
      card.appendChild(cardTitle);

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

export default renderFatebounds;
