import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { getAllRecords } from '../api/recordData';
import RecordCardLite from './RecordCardLite';

function DropdownSearch() {
  const [records, setRecords] = useState([]);

  const [formInput, setFormInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getMedicationsByUser = () => {
    getAllRecords(formInput.user?.id).then(setRecords);
    // console.warn(formInput.user?.id);
  };

  useEffect(() => {
    getAllRecords();
    getMedicationsByUser(records.user?.id);
    if (records?.id) setRecords(records);
    console.warn(records);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="searchbar">
      <InputGroup className="mb-3">
        <Form.Select className="mb-3" aria-label="User" name="userId" onChange={handleChange} required>
          {formInput?.id ? <option value="">{formInput.user?.name}</option> : <option value="">Select User</option>}
          {
              records?.map((userTaco) => (
                <option
                  key={userTaco.user.id}
                  value={userTaco.user.id}
                  defaultValue={userTaco.user.id === formInput.userId}
                >
                  {userTaco.user.name}
                </option>
              ))
          }
        </Form.Select>
      </InputGroup>
      <section className="search-medrecord-container">
        {records?.map((record) => (
          <RecordCardLite key={record.user?.id} recordObj={record} />
        ))}
      </section>
    </div>
  );
}

DropdownSearch.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    dosage: PropTypes.string,
    treatment: PropTypes.string,
    datePrescribed: PropTypes.string,
    userId: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
  // setFilteredRecords: PropTypes.func.isRequired,
};

export default DropdownSearch;
