// Card.js

export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
    this._handleCardClick = handleCardClick;
  }

  _createCardElement() {
    const cardElement = this._template.cloneNode(true);
    const cardImage = cardElement.querySelector(".element__image");
    const cardTitle = cardElement.querySelector(".element__title");
    const cardHeart = cardElement.querySelector(".element__image-heart");
    const trashIcon = cardElement.querySelector(".element__delete");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners(cardHeart, trashIcon, cardImage);

    return cardElement;
  }

  _handleHeartClick = (evt) => {
    evt.target.classList.toggle("element__image-heart-liked");
  };

  _handleTrashClick = (evt) => {
    evt.target.closest(".element").remove();
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
