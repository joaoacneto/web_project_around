popupNameInput.addEventListener("input", function (event) {
  const isValid = event.target.validity.valid;
  if (!isValid) {
    popupNameInput.classList.add("invalido");
    popupNameInput.classList.remove("valido");
    popupSaveButton.disabled = true;
  } else {
    popupNameInput.classList.remove("invalido");
    popupNameInput.classList.add("valido");
    popupSaveButton.removeAttribute("disabled");
  }
  const errorMsg = (document.querySelector("#mensagem").textContent =
    event.target.validationMessage);
});

popupTitleInput.addEventListener("input", function (event) {
  const isValid = event.target.validity.valid;
  if (!isValid) {
    popupTitleInput.classList.add("invalido");
    popupTitleInput.classList.remove("valido");
    popupSaveButton.setAttribute("disabled", true);
  } else {
    popupTitleInput.classList.remove("invalido");
    popupTitleInput.classList.add("valido");
    popupSaveButton.removeAttribute("disabled");
  }
  const errorMsg = (document.querySelector("#outramsg").textContent =
    event.target.validationMessage);
});

// const addButton = document.querySelector(".profile__add-button");
// const addPopup = document.querySelector(".add");
// const addCloseButton = document.querySelector(".add__close-button");
// const addSaveButton = document.querySelector(".add__save-button");
// const addForm = document.querySelector(".add__form");
// const elementsSection = document.querySelector(".elements");
// const addNameInput = document.querySelector(".add__name-input");
// const addTitleInput = document.querySelector(".add__title-input");

addNameInput.addEventListener("input", function (event) {
  const isValid = event.target.validity.valid;
  if (!isValid) {
    addNameInput.classList.add("invalido");
    addNameInput.classList.remove("valido");
    addSaveButton.disabled = true;
  } else {
    addNameInput.classList.remove("invalido");
    addNameInput.classList.add("valido");
    addSaveButton.removeAttribute("disabled");
  }
  const errorMsg = (document.querySelector("#msg").textContent =
    event.target.validationMessage);
});

addTitleInput.addEventListener("input", function (event) {
  const isValid = event.target.validity.valid;
  if (!isValid) {
    addTitleInput.classList.add("invalido");
    addTitleInput.classList.remove("valido");
    addSaveButton.setAttribute("disabled", true);
  } else {
    addTitleInput.classList.remove("invalido");
    addTitleInput.classList.add("valido");
    addSaveButton.removeAttribute("disabled");
  }
  const errorMsg = (document.querySelector("#urlmsg").textContent =
    event.target.validationMessage);
});
