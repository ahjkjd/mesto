export class FormValidator {
  constructor(validationConfig, formElement, disableButtonFunction) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._disableButton = disableButtonFunction;
  }

  _showInputError(inputElement,errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _activateButton(buttonElement) {
    buttonElement.classList.add(this._validationConfig.activeButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState(inputList,buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, this._validationConfig);
    } else {
      this._activateButton(buttonElement);
    }
  };

  _setEventListeners(formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}