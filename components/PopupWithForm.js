import Popup from './Popup.js';
import { validationConfig } from './constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._element.querySelectorAll(validationConfig.inputSelector));
    this._values = {};
    this._inputList.forEach((inputElement) => {
      this._values[inputElement.name] = inputElement.textContent;
    });
    return this._values;
  }

  _handleFormSubmit() {
    this._formElement = this._element.querySelector(validationConfig.formSelector);
    this._handleSubmit(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton = this._formElement.querySelector(validationConfig.submitButtonSelector);
    this._submitButton.addEventListener('click', () => {this._handleFormSubmit}); // bind?
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}