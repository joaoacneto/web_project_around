import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(name, link) {
    const popupImage = this._popup.querySelector(".image__popup-image");
    const popupCaption = this._popup.querySelector(".image__popup-subtitle");
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    super.open();
  }
}
