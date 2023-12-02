import { dataObjects } from "./data.js";

const allDataObjects = "[data-tags]";

const healyModels = document.querySelectorAll(".healy");

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
    objContainer.dataset.models = obj.models.join(", ");
    objContainer.classList.add("prog-card");
    objContainer.id = obj.name;
    dataContainer.appendChild(objContainer);
  });
}

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
      searchBar.value = "";
    }
    const availableCards = document.querySelectorAll(allDataObjects);
    availableCards.forEach((obj) => {
      if (obj.dataset.models.includes(model.id)) {
        obj.style.display = "block";
      } else {
        obj.style.display = "none";
      }
    });
  });
}

//Make cards clickable to open and close modal
function openCloseModal(data) {
  data.forEach((card) => {
    if (card) {
      const getCard = document.getElementById(card.name);
      getCard.addEventListener("click", () => {
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = `
      <div><i class="fas fa-times" data-close></i></div>
      <img src="${card.modal}">
      `;
        modalContainer.classList.add("modal-body");
        modalContainer.id = "popup-modal";
        dataContainer.appendChild(modalContainer);

        const modal = document.getElementById("popup-modal");
        const closeModal = document.querySelector("[data-close]");
        closeModal.addEventListener("click", () => {
          dataContainer.removeChild(modal);
        });
      });
    }
  });
}

//Make cards
addData(dataObjects);

//Set active healy model
healyModels.forEach((model) => {
  setActiveModel(model);
});

//Filter cards based on active healy model
filterCards(allDataObjects);

//Make cards clickable to open and close info modal
openCloseModal(dataObjects);
