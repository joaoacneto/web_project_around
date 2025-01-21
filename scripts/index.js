// --- Sprint 7 ---

const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__content-edit");
const closeButton = document.querySelector(".popup__close-button");
const popupSaveButton = document.querySelector(".popup__save-button");
const profileName = document.querySelector(".profile__content-name");
const profileJob = document.querySelector(".profile__content-job");
const popupNameInput = document.querySelector(".popup__name-input");
const popupTitleInput = document.querySelector(".popup__title-input");

editButton.addEventListener("click", function () {
  popup.classList.add("popup__opened");
  popupNameInput.value = profileName.textContent;
  popupTitleInput.value = profileJob.textContent;
  popupSaveButton.disabled = true;
});

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup__opened");
});

function saveNewInputValues(event) {
  event.preventDefault();
  if (popupNameInput.value != "") {
    profileName.textContent = popupNameInput.value;
  }
  if (popupTitleInput.value != "") {
    profileJob.textContent = popupTitleInput.value;
  }
  popup.classList.remove("popup__opened");
}
popupSaveButton.addEventListener("click", saveNewInputValues);

// --- Sprint 8 novas const ---
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".add");
const addCloseButton = document.querySelector(".add__close-button");
const addSaveButton = document.querySelector(".add__save-button");
const addForm = document.querySelector(".add__form");
const elementsSection = document.querySelector(".elements");
const addNameInput = document.querySelector(".add__name-input");
const addTitleInput = document.querySelector(".add__title-input");
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar Marashow",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// --- Sprint 9 novas conts ---

const imagePopup = document.querySelector(".image__popup");

// --- Para abrir e fechar o popup add ---

addButton.addEventListener("click", function () {
  addPopup.classList.add("add__opened");
  addSaveButton.disabled = true;
});

addCloseButton.addEventListener("click", function () {
  addPopup.classList.remove("add__opened");
});

// --- Função para criar um cartão ---
document.addEventListener("DOMContentLoaded", () => {
  function createCard(name, link) {
    const card = document.createElement("div");
    card.classList.add("element");

    const cardImage = document.createElement("img");
    cardImage.classList.add("element__image");
    cardImage.src = link;
    cardImage.alt = name;

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("element__info");

    const cardTitle = document.createElement("p");
    cardTitle.classList.add("element__title");
    cardTitle.textContent = name;

    // --- Adicionar clique no botão de coração ---

    const cardHeart = document.createElement("img");
    cardHeart.classList.add("element__image-heart");
    cardHeart.src = "./images/Group.svg";
    cardHeart.alt = "imagem do coração";

    cardHeart.addEventListener("click", () => {
      cardHeart.classList.toggle("element__image-heart-liked");
    });
    // --- Adicionar botao de lixo para deletar card ---

    const trashIcon = document.createElement("img");
    trashIcon.classList.add("element__delete");
    trashIcon.src = "./images/Trash.svg";
    trashIcon.alt = "ícone de lata de lixo";

    trashIcon.addEventListener("click", () => {
      card.remove();
    });

    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(cardHeart);

    card.appendChild(cardImage);
    card.appendChild(cardInfo);
    card.appendChild(trashIcon);

    return card;
  }

  // --- Add os cartões iniciais ---

  initialCards.forEach((cardData) => {
    const card = createCard(cardData.name, cardData.link);
    elementsSection.appendChild(card);
  });

  // --- Add um novo cartão ao enviar o formulário, resetar e fechar o popup Add ---

  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector(".add__name-input").value;
    const imageURL = document.querySelector(".add__url-input").value;

    const card = createCard(title, imageURL);
    elementsSection.prepend(card);

    addForm.reset();
    addPopup.classList.remove("add__opened");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const elementsSection = document.querySelector(".elements");
  const imagePopup = document.querySelector(".image__popup");
  const imagePopupContent = document.querySelector(".image__popup-content");
  const imagePopupImage = document.querySelector(".image__popup-image");
  const closePopupButton = document.querySelector(".image__popup-close-button");
  const imagePopupSubtitle = document.querySelector(".image__popup-subtitle");

  // --- Abrir o popup de imagem ---
  function openImagePopup(imageSrc, imageAlt, subtitle) {
    imagePopupImage.src = imageSrc;
    imagePopupImage.alt = imageAlt;
    imagePopupSubtitle.textContent = subtitle;
    imagePopup.style.display = "flex";
  }

  // --- Fechar o popup da imagem ---
  function closeImagePopup() {
    imagePopup.style.display = "none";
  }

  // --- Click para abrir o popup da imagem ---
  elementsSection.addEventListener("click", (event) => {
    if (event.target.classList.contains("element__image")) {
      const card = event.target.closest(".element");
      const cardTitle = card.querySelector(".element__title").textContent;
      openImagePopup(event.target.src, event.target.alt, cardTitle);
    }
  });

  // --- Clique para fechar o popup de imagem ---
  closePopupButton.addEventListener("click", closeImagePopup);

  // --- Fechar o popup ao clicar fora da imagem ---
  imagePopup.addEventListener("click", (event) => {
    if (
      event.target === imagePopupContent ||
      event.target === imagePopupImage
    ) {
      return;
    }
    closeImagePopup();
  });
});

// --- Fechar popups apertando esc ---

document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    addPopup.classList.remove("add__opened");
    popup.classList.remove("popup__opened");
    imagePopup.style.display = "none"; // não está funciondo
    popup.querySelector(".popup__form").reset();
    addPopup.querySelector(".add__form").reset();
  }
});

// -- Fechar popups clicando fora deles ---

popup.addEventListener("click", function (evt) {
  if (evt.target == popup) {
    popup.classList.remove("popup__opened");
  }
});

addPopup.addEventListener("click", function (evt) {
  if (evt.target == addPopup) {
    addPopup.classList.remove("add__opened");
  }
});
