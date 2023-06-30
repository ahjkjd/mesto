export class Card {
  constructor(name, link, templateSelector, handleOpenPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _openImage() {
    this._handleOpenPopup(this._name, this._link);
  }

  _toggleLikeButton() {
    this._likeButton.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setImageEventListener() {
    this._image.addEventListener('click', () => {
      this._openImage();
    });
  }
  
  _setLikeEventListener() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLikeButton();
    });
  }

  _setDeleteEventListener() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector('.card__like');
    this._deleteButton = this._element.querySelector('.card__delete');
    
    this._element.querySelector('.card__name').textContent = this._name;
    this._image = this._element.querySelector('.card__image');
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', `${this._name}, фото`);

    this._setImageEventListener();
    this._setLikeEventListener();
    this._setDeleteEventListener();

    return this._element;
  }
}