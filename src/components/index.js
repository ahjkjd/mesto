import '../pages/index.css';

import { initialCards, validationConfig, userInfoConfig } from './constants.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const page = document.querySelector('.page');
const editProfileButton = page.querySelector('.profile__edit');
const addCardButton = page.querySelector('.profile__add');

const profileEditPopup = new PopupWithForm('.popup_purpose_profile', (data) => {
  userInfo.setUserInfo(data);
});

const cardAddPopup = new PopupWithForm('.popup_purpose_cards', (data) => {
  renderCard(data);
});

const popupWithImage = new PopupWithImage('.popup_purpose_image');

const userInfo = new UserInfo(userInfoConfig);

const cardList = new Section({
    items: initialCards,
    renderer: renderCard
  }, '.cards');

function openProfileEditPopup() {
  const info = userInfo.getUserInfo();
  profileEditPopup.open.bind(profileEditPopup)(info);
}

function openCardAddPopup() {
  cardAddPopup.open.bind(cardAddPopup)({});
}

function renderCard(data) {
  const card = new Card(data, '#card', popupWithImage.open.bind(popupWithImage));
  cardList.addItem(card.generateCard());
}

const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

cardList.renderItems();

editProfileButton.addEventListener('click', openProfileEditPopup);
addCardButton.addEventListener('click', openCardAddPopup);