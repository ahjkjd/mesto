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
const imageDescription = popupCardAdd.querySelector('.popup__input_type_image-description');
const imageLink = popupCardAdd.querySelector('.popup__input_type_image-link');

const imagePopup = document.querySelector('.popup_purpose_image');
const closeImageButton = imagePopup.querySelector('.popup__close');
const image = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

function openProfileEditPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popupProfileEdit.classList.add('popup_opened');
}

function closePopup() {
  popupProfileEdit.classList.remove('popup_opened');
  popupCardAdd.classList.remove('popup_opened');
  imagePopup.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent =  inputDescription.value;
  closePopup();
}

function openImage(evt) {
  image.setAttribute('src', evt.target.src);
  const card = evt.target.parentElement;
  const caption = card.querySelector('.card__name');
  imageCaption.textContent = caption.textContent;
  imagePopup.classList.add('popup_opened');
}

function addCard(name, link) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__name').textContent = name;
  cardElement.querySelector('.card__image').setAttribute('src', link);
  
  cardContainer.prepend(cardElement);
  
  const likeButton = cardElement.querySelector('.card__like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  const image = cardElement.querySelector('.card__image');
  image.addEventListener('click', function (evt) {
    openImage(evt);
  });
}

function openCardAddPopup() {
  popupCardAdd.classList.add('popup_opened');
}

function handleCardFormSubmit (evt) {
  evt.preventDefault();
  addCard(imageDescription.value, imageLink.value);
  closePopup();
}

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

initialCards.forEach(item => {
  addCard(item.name, item.link);
})

editProfileButton.addEventListener('click', openProfileEditPopup);
closeProfileEditButton.addEventListener('click', closePopup);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', openCardAddPopup);
closeCardAddButton.addEventListener('click', closePopup);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', closePopup);