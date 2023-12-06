class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }

    return response.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then(this._getResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._getResponse);
  }
}
// eslint-disable-next-line no-unused-vars
const servDomen = "https://api.zikoshh.students.nomoredomainsmonster.ru";
const api = new Api("http://127.0.0.1:3000");

export default api;
