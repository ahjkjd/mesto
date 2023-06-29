import { initialCards, validationConfig } from './constants.js';
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

const imagePopup = document.querySelector('.popup_purpose_image');
const closeImageButton = imagePopup.querySelector('.popup__close');
const popupImage = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

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

function handleOpenImagePopup(name, link) {
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', `${name}, фото`);
  caption.textContent = name;
  openPopup(imagePopup);
}

function renderCard(name, link) {
  const card = new Card(name, link, '#card', handleOpenImagePopup);
  cardContainer.prepend(card.generateCard());
}

function handleCardFormSubmit (evt) {
  renderCard(inputImageDescription.value, inputImageLink.value);
  cardFormElement.reset();
  closePopup(popupCardAdd);
  validators[cardFormElement.getAttribute('name')].disableButton();
}

initialCards.forEach(item => {
  renderCard(item.name, item.link);
})

const validate = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  const validators = {};
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationConfig, formElement);
    formValidator.enableValidation();
    validators[formElement.getAttribute('name')] = formValidator;
  });
  return validators;
};

const validators = validate(validationConfig);

editProfileButton.addEventListener('click', openProfileEditPopup);
closeProfileEditButton.addEventListener('click', () => {closePopup(popupProfileEdit)});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => {openPopup(popupCardAdd)});
closeCardAddButton.addEventListener('click', () => {closePopup(popupCardAdd)});
cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', () => {closePopup(imagePopup)});