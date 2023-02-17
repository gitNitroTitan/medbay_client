import { clientCredentials } from '../utils/client';
import { deleteRecord } from './recordData';

const getPhysicians = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/physicians`)
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
        title: data.title,
        image_url: data.image_url,
        description: data.description,
      });
    })
    .catch((error) => reject(error));
});

const createPhysician = (user, physician) => new Promise((resolve, reject) => {
  const physicianObj = {
    user,
    title: physician.title,
    image_url: physician.image_url,
    description: physician.description,
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
    // hike: Number(physician.hikeId),
    title: physician.title,
    image_url: physician.image_url,
    description: physician.description,
  };
  fetch(`${clientCredentials.databaseURL}/physicians/${physician.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(physicianObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteSinglePhysician = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/physicians/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getPhysicianRecords = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records?physician=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const viewPhysicianDetails = (physicianId) => new Promise((resolve, reject) => {
  Promise.all([getSinglePhysician(physicianId), getPhysicianRecords(physicianId)])
    .then(([physicianObject, physicianRecordsArray]) => {
      resolve({ ...physicianObject, hikes: physicianRecordsArray });
    }).catch((error) => reject(error));
});

const deletePhysicianRecords = (physicianId) => new Promise((resolve, reject) => {
  getPhysicianRecords(physicianId)
    .then((recordsArray) => {
      const deleteRecordsPromises = recordsArray.map((record) => deleteRecord(record.id));
      Promise.all(deleteRecordsPromises).then(() => {
        deleteSinglePhysician(physicianId).then(resolve);
      });
    }).catch((error) => reject(error));
});

export {
  getPhysicians, createPhysician, updatePhysician, getSinglePhysician, deleteSinglePhysician, viewPhysicianDetails, getPhysicianRecords, deletePhysicianRecords,
};
