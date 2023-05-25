const showInputError = (formElement, inputElement, errorMessage, selectorsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorsObject.errorClass);
};

const hideInputError = (formElement, inputElement, selectorsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsObject.inputErrorClass);
  errorElement.classList.remove(selectorsObject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, selectorsObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorsObject);
  } else {
    hideInputError(formElement, inputElement, selectorsObject);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, selectorsObject) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.remove(selectorsObject.activeButtonClass);
  }
  else {
    buttonElement.classList.add(selectorsObject.activeButtonClass);
  }
}

const setEventListeners = (formElement, selectorsObject) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorsObject.inputSelector));
  const buttonElement = formElement.querySelector(selectorsObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, selectorsObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectorsObject);
      toggleButtonState(inputList, buttonElement, selectorsObject);
    });
  });
};

const enableValidation = (selectorsObject) => {
  const formList = Array.from(document.querySelectorAll(selectorsObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectorsObject);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  activeButtonClass: 'popup__save_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});