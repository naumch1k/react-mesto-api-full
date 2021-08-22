import { BASE_URL } from './constants';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const register = ({password, email}) => {
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

export const authorize = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    mode: "no-cors",
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

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => handleResponse(res));
}
