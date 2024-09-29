const renderWeapon = async (id) => {
  const mainContent = document.getElementById("main-content");

  // Fetch weapon data from the server
  const response = await fetch(`http://localhost:3001/weapon/${id}`);
  const weaponData = await response.json();

  // Fetch main and secondary fatebound data using their IDs
  const mainFateboundResponse = await fetch(
    `http://localhost:3001/fatebound/${weaponData.main_fatebound}`
  );
  const mainFateboundData = await mainFateboundResponse.json();

  const secondaryFateboundResponse = await fetch(
    `http://localhost:3001/fatebound/${weaponData.secondary_fatebound}`
  );
  const secondaryFateboundData = await secondaryFateboundResponse.json();

  // Clear the main content
  mainContent.innerHTML = "";

  if (weaponData && !weaponData.error) {
    // Create a wrapper for weapon info
    const weaponWrapper = document.createElement("div");
    weaponWrapper.classList.add("wrapper");

    // Title
    const title = document.createElement("h1");
    title.textContent = weaponData.name;
    title.classList.add("title");

    // Image
    const weaponImg = document.createElement("img");
    weaponImg.src = weaponData.img;
    weaponImg.alt = `${weaponData.name} image`;
    weaponImg.classList.add("img");

    // Weapon Type and Rarity
    const weaponInfo = document.createElement("div");
    weaponInfo.classList.add("info");
    const type = document.createElement("p");
    type.innerHTML = `<strong>Type:</strong> ${weaponData.type || "N/A"}`;
    const rarity = document.createElement("p");
    rarity.innerHTML = `<strong>Rarity:</strong> ${weaponData.rarity || "N/A"}`;


    // Stats (Main, Secondary, Ideal Fatebound)
    const stats = document.createElement("div");
    stats.classList.add("stats");

    // Main and Secondary Fatebound
    const mainFatebound = document.createElement("p");
    mainFatebound.innerHTML = `<strong>Main Fatebound:</strong> <a href='/fatebounds/${
      weaponData.main_fatebound
    }'> ${mainFateboundData.name || "N/A"}</a>`;
    const secondaryFatebound = document.createElement("p");
    secondaryFatebound.innerHTML = `<strong>Secondary Fatebound:</strong> <a href='/fatebounds/${
      weaponData.secondary_fatebound
    }'>${secondaryFateboundData.name || "N/A"}<a/>`;
    const idealFatebound = document.createElement("p");
    idealFatebound.innerHTML = `<strong>Ideal Fatebound:</strong> ${
      weaponData.ideal_fatebound || "N/A"
    }`;



    
    
    // Append elements to weaponInfo
    weaponInfo.appendChild(type);
    weaponInfo.appendChild(rarity);
    stats.appendChild(mainFatebound);
    stats.appendChild(secondaryFatebound);
    stats.appendChild(idealFatebound);
    weaponInfo.appendChild(stats)

    // Append all elements to the wrapper
    weaponWrapper.appendChild(title);
    weaponWrapper.appendChild(weaponImg);
    weaponWrapper.appendChild(weaponInfo);

    // Append the wrapper to mainContent
    mainContent.appendChild(weaponWrapper);
  } else {
    const notFound = document.createElement("h2");
    notFound.textContent = "Weapon not found 😔";
    mainContent.appendChild(notFound);
  }
};

export default renderWeapon;
