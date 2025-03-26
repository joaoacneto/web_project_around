import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { api } from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

let userId;

api
  .getInfo()
  .then((result) => {
    userId = result._id;
    userInfo.setUserInfo({
      name: result.name,
      job: result.about,
    });
    userInfo.setUserAvatar({
      avatar: result.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const handleCardLike = (cardId, isLiked) => {
  if (isLiked) {
    api.setDisliked(cardId).then((result) => {});
  } else {
    api.setLiked(cardId).then((result) => {});
  }
};

const handleCardDelete = (card, cardId) => {
  const temCerteza = document.querySelector("#temCerteza");
  temCerteza.textContent = "Deletando...";
  api
    .deleteCard(cardId)
    .then(() => {
      card.remove();

      popupWithConfirmation.close();
    })
    .finally(() => {
      setTimeout(() => {
        temCerteza.textContent = "Sim";
      }, 1000);
    });
};

const popupWithConfirmation = new PopupWithConfirmation(
  "#delete-card",
  handleCardDelete
);
popupWithConfirmation.setEventListeners();
let cardSection;

api
  .getInitialCards()
  .then((result) => {
    cardSection = new Section(
      {
        items: result,
        renderer: (cardData) => {
          const card = new Card(
            cardData,
            "#card-template",
            handleCardClick,
            (card, cardId) => {
              popupWithConfirmation.open(card, cardId);
            },
            userId,
            (cardId, isLiked) => {
              handleCardLike(cardId, isLiked);
            }
          );
          const cardElement = card.createCard();
          cardSection.addItem(cardElement);
        },
      },
      ".elements"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

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
  popupWithImage.open(name, link);
};

const editFormValidator = new FormValidator(
  validate,
  document.querySelector(".popup__form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validate,
  document.querySelector(".add__form")
);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validate,
  document.querySelector(".avatar__form")
);
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__content-name",
  jobSelector: ".profile__content-job",
  avatarSelector: ".profile__content-picture",
});

const popupEditProfile = new PopupWithForm("#edit-profile", (formData) => {
  const btnEditProfile = document.querySelector("#btnEditProfile");
  btnEditProfile.textContent = "Salvando...";
  api
    .setInfo(formData.name, formData.title)
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        btnEditProfile.textContent = "Salvar";
        popupEditProfile.close();
      }, 2000);
    });
});
popupEditProfile.setEventListeners();

const popupEditAvatar = new PopupWithForm("#edit-avatar", (formData) => {
  const btnEditAvatar = document.querySelector("#btnEditAvatar");
  btnEditAvatar.textContent = "Salvando...";
  api
    .editAvatar(formData.avatar)
    .then((result) => {
      userInfo.setUserAvatar({
        avatar: result.avatar,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setTimeout(() => {
        btnEditAvatar.textContent = "Salvar";
        popupEditAvatar.close();
      }, 1000);
    });
});
popupEditAvatar.setEventListeners();
const btnOpenAvatar = document.querySelector(".profile__content-pencil");
btnOpenAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

const popupAddCard = new PopupWithForm("#add-card", (formData) => {
  const btnAddSubmit = document.querySelector("#btnAddSubmit");
  btnAddSubmit.textContent = "Criando...";
  api
    .addNewCard(formData.name, formData.URL)
    .then((result) => {
      const newCard = new Card(
        {
          name: result.name,
          link: result.link,
          isLiked: result.isLiked,
          owner: result.owner,
        },
        "#card-template",
        handleCardClick,
        (card, cardId) => {
          popupWithConfirmation.open(card, cardId);
        },
        userId,
        (cardId, isLiked) => {
          handleCardLike(cardId, isLiked);
        }
      );
      cardSection.addItem(newCard.createCard());
    })
    .finally(() => {
      setTimeout(() => {
        btnAddSubmit.textContent = "Criar";
        popupAddCard.close();
      }, 1000);
    });
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
