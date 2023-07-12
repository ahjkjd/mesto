import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._image = this._element.querySelector('.popup__image');
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', `${name}, фото`);
    
    this._caption = this._element.querySelector('.popup__caption');
    this._caption.textContent = name;

    super.open();
  }
}