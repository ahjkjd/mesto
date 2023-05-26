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

const cardTemplate = document.querySelector('#card').content;

const imagePopup = document.querySelector('.popup_purpose_image');
const closeImageButton = imagePopup.querySelector('.popup__close');
const image = imagePopup.querySelector('.popup__image');
const imageCaption = imagePopup.querySelector('.popup__caption');

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

let closePopupWithEscape;

function openPopup(popup) {
  popup.classList.add('popup_opened');
  closePopupWithEscape = (evt) => {
    if(evt.key === 'Escape') {
      closePopup(popup);
    };
  };
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

function openImage(evt) {
  image.setAttribute('src', evt.target.src);
  image.setAttribute('alt', evt.target.alt);
  const card = evt.target.parentElement;
  const caption = card.querySelector('.card__name');
  imageCaption.textContent = caption.textContent;
  openPopup(imagePopup);
}

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image')

  cardElement.querySelector('.card__name').textContent = name;
  image.setAttribute('src', link);
  image.setAttribute('alt', `${name}, фото`);
  
  const likeButton = cardElement.querySelector('.card__like');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete');
  deleteButton.addEventListener('click', function () {
    cardElement.remove();
  });

  image.addEventListener('click', function (evt) {
    openImage(evt);
  });

  return cardElement;
}

function renderCard(name, link) {
  cardContainer.prepend(createCard(name, link));
}

function openCardAddPopup() {
  openPopup(popupCardAdd);
}

function handleCardFormSubmit (evt) {
  renderCard(inputImageDescription.value, inputImageLink.value);
  cardFormElement.reset();
  closePopup(popupCardAdd);
  disableButton(popupSaveButton,validationConfig);
}

initialCards.forEach(item => {
  renderCard(item.name, item.link);
})

editProfileButton.addEventListener('click', openProfileEditPopup);
closeProfileEditButton.addEventListener('click', () => {closePopup(popupProfileEdit)});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', openCardAddPopup);
closeCardAddButton.addEventListener('click', () => {closePopup(popupCardAdd)});
cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', () => {closePopup(imagePopup)});