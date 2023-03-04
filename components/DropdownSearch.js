import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAllRecords, getRecordsByUser } from '../api/recordData';
import { getAllUsers, getUserById } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

import RecordCardLite from './RecordCardLite';

function DropdownSearch() {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const { user } = useAuth();

  const getMedicationsByUser = () => {
    getAllRecords().then(setRecords);
  };

  const getUsersById = () => {
    getUserById(user.id).then(setUsers);
  };

  useEffect(() => {
    getAllUsers().then(setUsers);
    getMedicationsByUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    getRecordsByUser(value).then(setRecords);
  };

  return (
    <div className="searchbar">
      <InputGroup className="mb-3">
        <Form.Select className="mb-3" aria-label="User" name="userId" onChange={handleChange} required>
          {users.id ? <option value="">{users?.name}</option> : <option value="">Select User</option>}
          {
              users?.map((userTaco) => (
                <option
                  key={userTaco.id}
                  value={userTaco.id}
                >
                  {userTaco.name}
                </option>
              ))
          }
        </Form.Select>
      </InputGroup>
      <section className="search-medrecord-container">
        {records?.map((record) => (
          <RecordCardLite key={record?.id} recordObj={record} onUpdate={getUsersById} />
        ))}
      </section>
    </div>
  );
}

export default DropdownSearch;
