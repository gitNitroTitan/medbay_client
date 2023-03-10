/* eslint-disable no-unused-vars */
import { clientCredentials } from '../utils/client';

const getAllRecords = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getRecordsByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records?user=${id}`)
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
        user: data.user,
        name: data.name,
        dosage: data.dosage,
        treatment: data.treatment,
        datePrescribed: data.date_prescribed,
      });
    })
    .catch((error) => reject(error));
});

const updateRecord = (record, id) => new Promise((resolve, reject) => {
  const recordObj = {
    name: record.name,
    dosage: record.dosage,
    treatment: record.treatment,
    date_prescribed: record.datePrescribed,
  };
  fetch(`${clientCredentials.databaseURL}/records/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recordObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createRecord = (user, record) => new Promise((resolve, reject) => {
  const recordObj = {
    user,
    name: record.name,
    dosage: record.dosage,
    treatment: record.treatment,
    date_prescribed: record.datePrescribed,
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

const deleteRecord = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getAllRecords, updateRecord, getSingleRecord, deleteRecord, createRecord, getRecordsByUser,
};
