let page = document.querySelector('.page');
let popup = document.querySelector('.popup');
let editButton = page.querySelector('.profile__edit');
let closeButton = popup.querySelector('.popup__close');
let saveButton = popup.querySelector('.popup__save');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let formElement = popup.querySelector('form');
let inputName = formElement.querySelector('.popup__input_type_name');
let inputDescription = formElement.querySelector('.popup__input_type_description');

function openPopup() {
  inputName.setAttribute('value', profileName.textContent);
  inputName.value = profileName.textContent;
  inputDescription.setAttribute('value', profileDescription.textContent);
  inputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function save() {
  profileName.textContent = inputName.value;
  profileDescription.textContent =  inputDescription.value;
  closePopup();
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent =  inputDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);