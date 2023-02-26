import { clientCredentials } from '../utils/client';

const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { getUserById, getAllUsers };
