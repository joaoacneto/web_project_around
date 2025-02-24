import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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

const validate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "invalido",
  errorClass: "popup__msg-error",
};

const popupWithImage = new PopupWithImage(".image__popup");
popupWithImage.setEventListeners();

const handleCardClick = (link, name) => {
  popupWithImage.open(link, name);
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleCardClick);
      const cardElement = card.createCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderItems();

const editFormValidator = new FormValidator(
  validate,
  document.querySelector(".popup__form")
);
editFormValidator.enableValidation();

// const addFormValidator = new FormValidator(
//   validate,
//   document.querySelector(".add__form")
// );
// addFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__content-name",
  jobSelector: ".profile__content-job",
});

const popupEditProfile = new PopupWithForm("#edit-profile", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.title,
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm("#add-card", (formData) => {
  console.log(formData);
  const newCard = new Card(
    {
      name: formData.name,
      link: formData.URL,
    },
    "#card-template",
    handleCardClick
  );
  cardSection.addItem(newCard.createCard());
  popupAddCard.close();
});
popupAddCard.setEventListeners();

const editButton = document.querySelector(".profile__content-edit");
editButton.addEventListener("click", () => {
  const user = userInfo.getUserInfo();
  document.querySelector(".popup__name-input").value = user.name;
  document.querySelector(".popup__title-input").value = user.job;
  popupEditProfile.open();
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  popupAddCard.open();
});
