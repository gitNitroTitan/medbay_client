/* eslint-disable no-unused-vars */
import { clientCredentials } from '../utils/client';

const getAllRecords = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleRecord = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        board: data.board,
        user: data.user,
        name: data.name,
        url: data.url,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        description: data.description,
      });
    })
    .catch((error) => reject(error));
});

const updateRecord = (hike, id) => new Promise((resolve, reject) => {
  const recordObj = {
    board: Number(hike.boardId),
    name: hike.name,
    url: hike.url,
    latitude: hike.latitude,
    longitude: hike.longitude,
    description: hike.description,
  };
  fetch(`${clientCredentials.databaseURL}/records/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recordObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createRecord = (user, hike, latitude, longitude, url) => new Promise((resolve, reject) => {
  const recordObj = {
    user,
    board: Number(hike.boardId),
    name: hike.name,
    url,
    latitude,
    longitude,
    description: hike.description,
  };
  fetch(`${clientCredentials.databaseURL}/records`, {
    method: 'POST',
    body: JSON.stringify(recordObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getRecords = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteRecord = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getRecords, getAllRecords, updateRecord, getSingleRecord, deleteRecord, createRecord,
};
