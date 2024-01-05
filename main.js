import { dataObjects } from "./data.js";

const allDataObjects = "[data-tags]";

let availableCards = [];

const healyModels = document.querySelectorAll(".healy");

const searchBar = document.querySelector("#search");

const dataContainer = document.querySelector(".data-ctn");

//Add data objects to container
function addData(data) {
  data.forEach((obj) => {
    const objContainer = document.createElement("button");
    objContainer.tabIndex = "0";
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
function filterCards() {
  searchBar.addEventListener("keyup", (input) => {
    const searchInput = input.target.value.toLowerCase().trim();
    const displayedCards =
      availableCards.length > 0
        ? availableCards
        : document.querySelectorAll(allDataObjects);

    displayedCards.forEach((card) => {
      card.dataset.tags.includes(searchInput)
        ? (card.style.display = "block")
        : (card.style.display = "none");
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
      availableCards = [];
    }
    const cards = document.querySelectorAll(allDataObjects);
    cards.forEach((card) => {
      if (card.dataset.models.includes(model.id)) {
        card.style.display = "block";
        availableCards.push(card);
      } else {
        card.style.display = "none";
      }
    });
  });
}

//Make cards clickable to open and close modal
function openCloseModal(data) {
  data.forEach((card) => {
    if (card) {
      const getCard = document.getElementById(card.name);
      const modalId = `popup-modal-${card.name}`;
      getCard.addEventListener("click", () => {
        const modalBackground = document.createElement("div");
        modalBackground.classList.add("modal-background");
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = `
      <div><i class="fas fa-times" data-close></i></div>
      <img class="modal-img" src="${card.modal}">
      `;
        modalContainer.classList.add("modal-body");
        modalContainer.id = modalId;
        dataContainer.appendChild(modalBackground);
        modalBackground.appendChild(modalContainer);

        const closeModalButtons = document.querySelectorAll("[data-close]");
        closeModalButtons.forEach((button) => {
          button.addEventListener("click", () => {
            dataContainer.removeChild(modalBackground);
          });
        });
        document.addEventListener("click", (e) => {
          if (e.target === modalBackground) {
            dataContainer.removeChild(modalBackground);
          }
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
filterCards();

//Make cards clickable to open and close info modal
openCloseModal(dataObjects);
