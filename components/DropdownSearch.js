import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getRecordsByUser } from '../api/recordData';
import { getAllUsers, getUserById } from '../api/userData';
import createEmail from '../api/emailData';
import { useAuth } from '../utils/context/authContext';

import RecordCardLite from './RecordCardLite';

function DropdownSearch() {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [formInput, setFormInput] = useState({});
  const { user } = useAuth();

  const getMedicationsByUser = () => {
    getRecordsByUser(user.id).then(setRecords);
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
    const { name, value } = e.target;
    getRecordsByUser(value).then(setRecords);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (records?.id) {
      createEmail(formInput).then(() => {
        // router.push('/user_medication');
      });
    }
  };

  return (
    <div className="dropdownContainer">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Send to:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="name" value={formInput.email} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Email
        </Button>
      </Form>
      <br />
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
      <section className="dropdownMedrecordListContainer">
        {records?.map((record) => (
          <RecordCardLite key={record?.id} recordObj={record} onUpdate={getUsersById} />
        ))}
      </section>
    </div>
  );
}

export default DropdownSearch;
