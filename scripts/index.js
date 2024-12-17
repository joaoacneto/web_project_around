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
