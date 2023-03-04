/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createRecord, updateRecord } from '../../api/recordData';
// import getUsersById from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

function MedRecordForm({ recordObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (recordObj?.id) setFormInput(recordObj);
  }, [recordObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recordObj?.id) {
      updateRecord(formInput, recordObj.id, user).then(() => router.push(`/records/user/${user.id}`));
    } else {
      createRecord(user.id, formInput).then(() => {
        router.push(`/records/user/${user.id}`);
      });
    }
  };

  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">Medication Record Form </h3>

        <div className="card-body">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput1" label="Medication Record Name" className="mb-3">
              <Form.Control type="text" placeholder="Enter Medication Record" name="name" value={formInput.name} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Medication Dosage in mg" className="mb-3">
              <Form.Control type="text" placeholder="Enter dosage in mg" name="dosage" value={formInput.dosage} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Treatment" className="mb-3">
              <Form.Control type="text" placeholder="Treatment For" name="treatment" value={formInput.treatment} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Date Prescribed" className="mb-3">
              <Form.Control type="text" placeholder="Enter date prescribed" name="datePrescribed" value={formInput.datePrescribed} onChange={handleChange} required />
            </FloatingLabel>

            <Button className="btn-submit" variant="secondary" type="submit">
              {formInput.id ? 'Update' : 'Create'} Record
            </Button>
          </Form>
        </div>
        <div className="card-footer text-muted">MEDBAY &#8482;
        </div>
      </div>
    </div>
  );
}

MedRecordForm.propTypes = {
  // user: PropTypes.shape({
  //   id: PropTypes.number,
  //   uid: PropTypes.string,
  //   name: PropTypes.string,
  //   age: PropTypes.string,
  //   bio: PropTypes.string,
  //   image_url: PropTypes.string,
  //   email: PropTypes.string,
  //   location: PropTypes.string,
  //   localPharmacy: PropTypes.string,
  // }).isRequired,
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    dosage: PropTypes.string,
    treatment: PropTypes.string,
    datePrescribed: PropTypes.string,
  }).isRequired,
};

export default MedRecordForm;
