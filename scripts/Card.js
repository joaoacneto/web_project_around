import { api } from "./Api.js";

export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardDelete,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._id = data._id;
    this._owner = data.owner;
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._userId = userId;
  }

  _createCardElement() {
    const cardElement = this._template.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__title");
    const cardHeart = cardElement.querySelector(".element__image-heart");
    const trashIcon = cardElement.querySelector(".element__delete");

    if (this._userId !== this._owner) {
      trashIcon.style.display = "none";
    }

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
    if (this._isLiked) {
      cardHeart.classList.toggle("element__image-heart-liked");
    }
    this._setEventListeners(cardHeart, trashIcon, cardImage);

    return cardElement;
  }

  _handleHeartClick = (evt) => {
    api
      .setLiked(!this._isLiked)
      .then((result) => {
        console.log(result);
        if (this._isLiked) {
          evt.target.classList.toggle("element__image-heart-liked");
        } else {
          evt.target.classList.toggle("element__image-heart");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _handleTrashClick = (evt) => {
    this._handleCardDelete(evt.target.closest(".element"), this._id);
  };

  _setEventListeners(cardHeart, trashIcon, cardImage) {
    cardHeart.addEventListener("click", this._handleHeartClick);
    trashIcon.addEventListener("click", this._handleTrashClick);
    cardImage.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }

  createCard() {
    return this._createCardElement();
  }
}
