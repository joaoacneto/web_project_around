// utils.js

export function openPopup(popupElement) {
  popupElement.classList.add("popup__opened");
}

export function closePopup(popupElement) {
  popupElement.classList.remove("popup__opened");
}

export function addEventListeners() {
  const popup = document.querySelector(".popup");
  const addPopup = document.querySelector(".add");
  const imagePopup = document.querySelector(".image__popup");
  const editButton = document.querySelector(".profile__content-edit");
  const closeButton = popup.querySelector(".popup__close-button");
  const addButton = document.querySelector(".profile__add-button");
  const addCloseButton = addPopup.querySelector(".add__close-button");
  const imagePopupCloseButton = imagePopup.querySelector(
    ".image__popup-close-button"
  );
  const editForm = popup.querySelector(".popup__form");
  const addForm = addPopup.querySelector(".add__form");
  const elementsSection = document.querySelector(".elements");

  editButton.addEventListener("click", () => {
    const nameInput = editForm.querySelector(".popup__name-input");
    const aboutInput = editForm.querySelector(".popup__title-input");
    nameInput.value = document.querySelector(
      ".profile__content-name"
    ).textContent;
    aboutInput.value = document.querySelector(
      ".profile__content-job"
    ).textContent;
    openPopup(popup);
  });

  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });

  addButton.addEventListener("click", () => {
    openPopup(addPopup);
  });

  addCloseButton.addEventListener("click", () => {
    closePopup(addPopup);
  });

  imagePopupCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
  });

  editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    document.querySelector(".profile__content-name").textContent =
      editForm.querySelector(".popup__name-input").value;
    document.querySelector(".profile__content-job").textContent =
      editForm.querySelector(".popup__title-input").value;
    closePopup(popup);
  });

  addForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCard = new Card(
      {
        name: addForm.querySelector(".add__name-input").value,
        link: addForm.querySelector(".add__url-input").value,
      },
      "#card-template"
    );
    elementsSection.prepend(newCard.createCard());
    addForm.reset();
    closePopup(addPopup);
  });

  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup__opened");
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  });

  document.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__opened")) {
      closePopup(evt.target);
    }
  });
}
