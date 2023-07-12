export default class UserInfo {
    constructor({ nameSelector, infoSelector }) {
      this._nameElement = document.querySelector(nameSelector);
      this._infoElement = document.querySelector(infoSelector);
    }

    getUserInfo() {
      this._userInfo = {
        'profile-name': this._nameElement.textContent,
        'profile-description': this._infoElement.textContent
      }
      return this._userInfo;
    }

    setUserInfo(info) {
      this._nameElement.textContent = info['profile-name'];
      this._infoElement.textContent = info['profile-description'];
    }
  }