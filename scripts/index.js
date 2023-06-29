import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const page = document.querySelector('.page');

const popupProfileEdit = document.querySelector('.popup_purpose_profile');
const editProfileButton = page.querySelector('.profile__edit');
const closeProfileEditButton = popupProfileEdit.querySelector('.popup__close');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const profileFormElement = popupProfileEdit.querySelector('.popup__form');
const inputName = profileFormElement.querySelector('.popup__input_type_name');
const inputDescription = profileFormElement.querySelector('.popup__input_type_description');

const cardContainer = page.querySelector('.cards');
const popupCardAdd = document.querySelector('.popup_purpose_cards');
const addCardButton = page.querySelector('.profile__add');
const closeCardAddButton = popupCardAdd.querySelector('.popup__close');
const cardFormElement = popupCardAdd.querySelector('.popup__form');
const inputImageDescription = popupCardAdd.querySelector('.popup__input_type_image-description');
const inputImageLink = popupCardAdd.querySelector('.popup__input_type_image-link');
const popupSaveButton = popupCardAdd.querySelector('.popup__save');

const imagePopup = document.querySelector('.popup_purpose_image');
const closeImageButton = imagePopup.querySelector('.popup__close');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  activeButtonClass: 'popup__save_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const imagePopupConfig = {
  imagePopup: imagePopup,
  openFunction: openPopup,
  imageSelector: '.popup__image',
  captionSelector: '.popup__caption'
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscape);
  document.removeEventListener('click', closePopupWithClick);
}

function closePopupWithClick(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

function closePopupWithEscape(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscape);
  document.addEventListener('click', closePopupWithClick);
}

function openProfileEditPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupProfileEdit);
}

function handleProfileFormSubmit(evt) {
  profileName.textContent = inputName.value;
  profileDescription.textContent =  inputDescription.value;
  closePopup(popupProfileEdit);
}

function renderCard(name, link) {
  const card = new Card(name, link, '#card', imagePopupConfig);
  cardContainer.prepend(card.generateCard());
}

function disableButton(buttonElement,validationConfig) {
  buttonElement.classList.remove(validationConfig.activeButtonClass);
  buttonElement.setAttribute('disabled', true);
};

function handleCardFormSubmit (evt) {
  renderCard(inputImageDescription.value, inputImageLink.value);
  cardFormElement.reset();
  closePopup(popupCardAdd);
  disableButton(popupSaveButton,validationConfig);
}

initialCards.forEach(item => {
  renderCard(item.name, item.link);
})

const validate = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    const form = new FormValidator(validationConfig, formElement, disableButton);
    form.enableValidation();
  });
};

validate(validationConfig);

editProfileButton.addEventListener('click', openProfileEditPopup);
closeProfileEditButton.addEventListener('click', () => {closePopup(popupProfileEdit)});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {openPopup(popupCardAdd)});
closeCardAddButton.addEventListener('click', () => {closePopup(popupCardAdd)});
cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', () => {closePopup(imagePopup)});