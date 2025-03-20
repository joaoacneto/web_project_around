import { Popup } from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._confirmationButton = document.querySelector(".popup__delete-card");
    this._handleDeleteCard = handleDeleteCard;
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", () => {
      this._handleDeleteCard(this._card, this._cardId);
    });
  }

  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }
}
