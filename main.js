import { dataObjects } from "./data.js";

const allDataObjects = "[data-tags]";

const healyModels = document.querySelectorAll(".healy");
const healyModelsId = Array.from(healyModels).map((model) => model.id);

const searchBar = document.querySelector("#search");

const dataContainer = document.querySelector(".data-ctn");

//Add data objects to container
function addData(data) {
  data.forEach((obj) => {
    const objContainer = document.createElement("div");
    objContainer.innerHTML = `
    <img src="${obj.img}" alt="${obj.name}">
    `;
    objContainer.dataset.tags = obj.tags.join(", ");
    dataContainer.appendChild(objContainer);
  });
}

addData(dataObjects);

//Filter data cards
function filterCards(data) {
  const searchContent = document.querySelectorAll(data);

  searchBar.addEventListener("keyup", (input) => {
    const searchInput = input.target.value.toLowerCase().trim();

    searchContent.forEach((card) => {
      if (card.dataset.tags.includes(searchInput)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

//Set active model
function setActiveModel(model) {
  model.addEventListener("click", () => {
    if (model.dataset.active !== "active") {
      const activeModel = document.querySelector(
        ".healy[data-active='active']"
      );
      if (activeModel) {
        activeModel.dataset.active = "not";
        activeModel.classList.remove("active");
      }

      model.dataset.active = "active";
      model.classList.add("active");
      dataContainer.innerHTML = "";
      const filteredDataObjects = dataObjects.filter((obj) =>
        obj.models.includes(model.id)
      );
      addData(filteredDataObjects);
      filterCards(allDataObjects);
    }
  });
}

addData(dataObjects);

healyModels.forEach((model) => {
  setActiveModel(model);
});

filterCards(allDataObjects);
