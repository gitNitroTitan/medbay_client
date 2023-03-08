/* eslint-disable no-unused-vars */
import { clientCredentials } from '../utils/client';

const createEmail = (email) => new Promise((resolve, reject) => {
  const emailObj = {
    email: email.email,
  };
  fetch(`${clientCredentials.databaseURL}/emails`, {
    method: 'POST',
    body: JSON.stringify(emailObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export default createEmail;
