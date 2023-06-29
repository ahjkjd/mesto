export class Card {
  constructor(name, link, templateSelector, imagePopupConfig) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._imagePopupConfig = imagePopupConfig;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _openImage() {
    const imagePopup = this._imagePopupConfig.imagePopup;
    const popupImage = imagePopup.querySelector(this._imagePopupConfig.imageSelector);
    const caption = imagePopup.querySelector(this._imagePopupConfig.captionSelector);
    popupImage.setAttribute('src', this._link);
    popupImage.setAttribute('alt', `${this._name}, фото`);
    caption.textContent = this._name;
    this._imagePopupConfig.openFunction(imagePopup);
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._openImage();
    });

    this._likeButton = this._element.querySelector('.card__like');
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('card__like_active');
    });

    this._deleteButton = this._element.querySelector('.card__delete');
    this._deleteButton.addEventListener('click', () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__name').textContent = this._name;
    this._image = this._element.querySelector('.card__image');
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', `${this._name}, фото`);

    this._setEventListeners();

    return this._element;
  }
}