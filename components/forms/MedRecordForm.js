/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createRecord, updateRecord } from '../../api/recordData';
import { getPhysicians } from '../../api/physicianData';
import { useAuth } from '../../utils/context/authContext';

function RecordForm({ recordObj }) {
  const [formInput, setFormInput] = useState({
    id: 0,
    name: '',
    dosage: '',
    datePrescribed: '',
    physician: {
      id: 0,
      name: '',
      specialty: '',
      email: '',
      phoneNumber: '',
      location: '',
    },
    user: {
      id: 0,
      uid: '',
    },
  });
  const { user } = useAuth();
  const [physicians, setPhysicians] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getPhysicians().then(setPhysicians);
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
      updateRecord(formInput, recordObj.id, user).then(() => router.push('/hikes'));
    } else {
      createRecord(user.uid, ...formInput).then(() => {
        router.push('/hikes');
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

            <FloatingLabel controlId="floatingInput3" label="Medication Dosage " className="mb-3">
              <Form.Control type="text" placeholder="Enter dosage" name="dosage" value={formInput.dosage} onChange={handleChange} required />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput3" label="Date Prescribed" className="mb-3">
              <Form.Control type="text" placeholder="Enter date prescribed" name="datePrescribed" value={formInput.datePrescribed} onChange={handleChange} required />
            </FloatingLabel>

            <Form.Select className="mb-3" aria-label="Physician" name="physicianId" onChange={handleChange} required>
              {formInput.id ? <option value="">{formInput.physician?.name}</option> : <option value="">Select Physician</option>}
              {
            physicians.map((physician) => (
              <option
                key={physician.id}
                value={physician.id}
                defaultValue={physician.id === formInput.physicianId}
              >
                {physician.name}
              </option>
            ))
          }
            </Form.Select>
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

RecordForm.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.number,
      uid: PropTypes.string,
      name: PropTypes.string,
      age: PropTypes.string,
      bio: PropTypes.string,
      image_url: PropTypes.string,
      email: PropTypes.string,
      location: PropTypes.string,
      localPharmacy: PropTypes.string,
    }),
    name: PropTypes.string,
    dosage: PropTypes.string,
    datePrescribed: PropTypes.string,
    physicianId: PropTypes.number,
    physician: PropTypes.shape({
      id: PropTypes.number,
      record: PropTypes.string,
      name: PropTypes.string,
      specialty: PropTypes.string,
      email: PropTypes.string,
      location: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  }).isRequired,
};

export default RecordForm;
