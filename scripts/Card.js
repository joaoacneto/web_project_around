export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(".element");
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

  _handleImageClick = (evt) => {
    const imagePopup = document.querySelector(".image__popup");
    const imagePopupImage = imagePopup.querySelector(".image__popup-image");
    const imagePopupSubtitle = imagePopup.querySelector(
      ".image__popup-subtitle"
    );

    imagePopupImage.src = evt.target.src;
    imagePopupImage.alt = evt.target.alt;
    imagePopupSubtitle.textContent = this._name;

    openPopup(imagePopup);
  };

  _setEventListeners(cardHeart, trashIcon, cardImage) {
    cardHeart.addEventListener("click", this._handleHeartClick);
    trashIcon.addEventListener("click", this._handleTrashClick);
    cardImage.addEventListener("click", this._handleImageClick);
  }

  createCard() {
    return this._createCardElement();
  }
}
