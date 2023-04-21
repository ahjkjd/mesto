let page = document.querySelector('.page');
let popup = document.querySelector('.popup');
let editButton = page.querySelector('.profile__edit');
let closeButton = popup.querySelector('.popup__close');
let saveButton = popup.querySelector('.popup__save');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let inputName = popup.querySelector('.popup__input_type_name');
let inputDescription = popup.querySelector('.popup__input_type_description');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.setAttribute('value', profileName.textContent);
  inputDescription.setAttribute('value', profileDescription.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function save() {
  profileName.textContent = inputName.value;
  profileDescription.textContent =  inputDescription.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', save);