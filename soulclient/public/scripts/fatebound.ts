const renderFatebound = async (id) => {
  const mainContent = document.getElementById("main-content");

  // Fetch fatebound data from the server
  const response = await fetch(`http://localhost:3001/fatebound/${id}`);
  const data = await response.json();

  // Clear the main content
  mainContent.innerHTML = "";

  if (data && !data.error) {
    // Create a wrapper for fatebound info
    const fateboundWrapper = document.createElement("div");
    fateboundWrapper.classList.add("wrapper");

    // Title
    const title = document.createElement("h1");
    title.textContent = data.name;
    title.classList.add("title");

    // Image
    const fateboundImg = document.createElement("img");
    fateboundImg.src = data.img;
    fateboundImg.alt = `${data.name} image`;
    fateboundImg.classList.add("img");

    // Description
    const description = document.createElement("p");
    description.textContent = data.description;
    description.classList.add("description");

    const pe_2 = document.createElement("p");
    const pe_3 = document.createElement("p");

    pe_2.innerHTML = `<strong>2nd Fatebound Effect:</strong> <hr/> ${data["2_equip_pe"]}`;
    pe_3.innerHTML = `<strong>3rd Fatebound Effect:</strong> <hr/> ${data["3_equip_pe"]}`;

    const peContainer = document.createElement("section");
    peContainer.appendChild(pe_2);
    peContainer.appendChild(pe_3);

    const imgPEContainer = document.createElement("div");
    imgPEContainer.appendChild(fateboundImg);
    imgPEContainer.appendChild(peContainer);

    imgPEContainer.classList.add("img-pe-container");

    // Append all elements to the wrapper
    fateboundWrapper.appendChild(title);
    fateboundWrapper.appendChild(imgPEContainer);
    fateboundWrapper.appendChild(description);
    

    // Append the wrapper to mainContent
    mainContent.appendChild(fateboundWrapper);
  } else {
    const notFound = document.createElement("h2");
    notFound.textContent = "Fatebound not found 😔";
    notFound.classList.add("not-found");
    mainContent.appendChild(notFound);
  }
};

export default renderFatebound;
