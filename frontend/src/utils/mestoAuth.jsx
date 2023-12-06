// eslint-disable-next-line no-unused-vars
const servDomen = "https://api.zikoshh.students.nomoredomainsmonster.ru";
const baseUrl = "http://127.0.0.1:3000";

function getResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  return response.json();
}

export function signIn({ password, email }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`,
    }),
  }).then(getResponse);
}

export function signUp({ password, email }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      password: `${password}`,
      email: `${email}`,
    }),
  }).then(getResponse);
}

export function tokenCheck() {
  return fetch(`${baseUrl}/users/me`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  }).then(getResponse);
}

export function signOut() {
  return fetch(`${baseUrl}/signout`, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  }).then(getResponse);
}
