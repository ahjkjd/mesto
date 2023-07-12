import Popup from './Popup.js';
import { validationConfig } from './constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._element.querySelector(validationConfig.formSelector);
  }

  _getInputValues() {
    this._inputList = Array.from(this._element.querySelectorAll(validationConfig.inputSelector));
    this._values = {};
    this._inputList.forEach((inputElement) => {
      const key = inputElement.getAttribute('id');
      const string = inputElement.value;
      this._values[key] = string;
    });
    return this._values;
  }

  _handleFormSubmit = () => {
    this._handleSubmit(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit); // bind?
  }

  open(inputValues) {
    Object.keys(inputValues).forEach((value) => {
      const inputElement = this._element.querySelector(`#${value}`);
      inputElement.value = inputValues[value];
    });
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}