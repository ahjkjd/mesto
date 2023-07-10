export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
      this._userInfo = {
        name: this._nameElement.textContent,
        info: this._infoElement.textContent
      }
      return this._userInfo;
    }

    setUserInfo({ name, info }) {
      this._nameElement.textContent = name;
      this._infoElement.textContent = info;
    }
  }