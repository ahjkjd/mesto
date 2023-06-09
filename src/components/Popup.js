export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
    this._closeButton = this._element.querySelector('.popup__close');
  }

  open() {
    this._element.classList.add('popup_opened');
    this.setEventListeners();
  }

  close = () => {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleClickClose);
    this._closeButton.removeEventListener('click', this.close);
  }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
    };
  }

  _handleClickClose = (evt) => {
    if(evt.target === this._element) {
      this.close();
    };
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleClickClose);
    this._closeButton.addEventListener('click', this.close);
  }
}