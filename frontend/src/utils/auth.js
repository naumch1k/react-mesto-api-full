import { BASE_URL } from './constants';
//const BASE_URL = 'http://localhost:3000';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      password,
      email
    })
  })
    .then((res) => handleResponse(res));
}

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    credentials: "include",
    body: JSON.stringify({
      password,
      email
    })
  })
  .then((res) => handleResponse(res));
}

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': "application/json",
    },
    credentials: 'include',
  })
  .then((res) => handleResponse(res));
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
      method: "DELETE",
      credentials: "include",
  }).then((res) => handleResponse(res));
};
