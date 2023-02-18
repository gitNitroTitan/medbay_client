import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPhysician, updatePhysician } from '../../api/physicianData';
import { useAuth } from '../../utils/context/authContext';

function PhysicianForm({ physicianObj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (physicianObj?.id) setFormInput(physicianObj);
  }, [physicianObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (physicianObj?.id) {
      updatePhysician(formInput, physicianObj.id, user)
        .then(() => router.push(`/physicians/user/${user.id}`));
    } else {
      // console.warn(user.id, formInput);
      createPhysician(user.id, formInput).then(() => {
        router.push(`/physicians/user/${user.id}`);
      });
    }
  };
  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">Physician Form</h3>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Physician Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter Physician Name" name="name" value={formInput.name} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Physician Specialty" className="mb-3">
            <Form.Control type="text" placeholder="Enter physician specialty" name="specialty" value={formInput.specialty} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Physician Email" className="mb-3">
            <Form.Control type="text" placeholder="Enter physician email" name="email" value={formInput.email} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Physician Phone Number" className="mb-3">
            <Form.Control type="text" placeholder="Enter physician phone number" name="phoneNumber" value={formInput.phoneNumber} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Physician Location" className="mb-3">
            <Form.Control type="text" placeholder="Enter physician location" name="location" value={formInput.location} onChange={handleChange} required />
          </FloatingLabel>

          <Button variant="secondary" type="submit">{formInput.id ? 'Update' : 'Create'} Physician</Button>
        </Form>
      </div>
      <div className="card-footer text-muted">
        MEDBAY &#8482;
      </div>
    </div>
  );
}

PhysicianForm.propTypes = {
  physicianObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    specialty: PropTypes.string,
    email: PropTypes.string,
    location: PropTypes.string,
    phoneNumber: PropTypes.string,
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
    // record: PropTypes.string,
  }).isRequired,
};

export default PhysicianForm;
