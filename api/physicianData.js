import { clientCredentials } from '../utils/client';

const getPhysicians = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/physicians`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPhysiciansByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/physicians?user=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePhysician = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/physicians/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id, /// fix this data to match physician, make sure with levelup repo also
        name: data.name,
        specialty: data.specialty,
        email: data.email,
        phoneNumber: data.phone_number,
        location: data.location,
      });
    })
    .catch((error) => reject(error));
});

const createPhysician = (user, physician) => new Promise((resolve, reject) => {
  const physicianObj = {
    user,
    name: physician.name,
    specialty: physician.specialty,
    email: physician.email,
    phone_number: physician.phoneNumber,
    location: physician.location,
  };
  fetch(`${clientCredentials.databaseURL}/physicians`, {
    method: 'POST',
    body: JSON.stringify(physicianObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updatePhysician = (physician) => new Promise((resolve, reject) => {
  const physicianObj = {
    name: physician.name,
    specialty: physician.specialty,
    email: physician.email,
    phone_number: physician.phoneNumber,
    location: physician.location,
  };
  fetch(`${clientCredentials.databaseURL}/physicians/${physician.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(physicianObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deletePhysician = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/physicians/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getPhysicians, createPhysician, updatePhysician, getSinglePhysician, deletePhysician, getPhysiciansByUser,
};
