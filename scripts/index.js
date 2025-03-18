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
      avatar: result.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const handleCardLike = (cardId, isLiked) => {
  if (isLiked) {
    api.setDisliked(cardId).then((result) => {
      console.log(result);
    });
  } else {
    api.setLiked(cardId).then((result) => {
      console.log(result);
    });
  }
};

const handleCardDelete = (card, cardId) => {
  api.deleteCard(cardId).then(() => {
    // const temCerteza = document.querySelector("#temCerteza");
    // temCerteza.textContent = "Deletando...";
    card.remove();
    //.finally
    popupWithConfirmation.close();
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
    console.log(err); // registra o erro no console
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
  console.log("entrou");
  popupWithImage.open(name, link);
};

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
  // avatarSelector: ".profile__picture",
});

const popupEditProfile = new PopupWithForm("#edit-profile", (formData) => {
  const btnEditProfile = document.querySelector("#btnEditProfile");
  btnEditProfile.textContent = "Salvando...";
  console.log(formData);
  api
    .setInfo(formData.name, formData.title)
    .then((result) => {
      console.log(result);
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnEditProfile.textContent = "Salvar";
    });

  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

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
      btnAddSubmit.textContent = "Criar";
    });

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
