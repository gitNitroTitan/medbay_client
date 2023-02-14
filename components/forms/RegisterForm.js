import PropTypes from 'prop-types';
import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../utils/auth';

const initialState = {
  name: '',
  age: 0,
  bio: '',
  imageUrl: '',
  email: '',
  location: '',
  localPharmacy: '',
};
function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData, uid: user.uid,
    };
    registerUser(payload).then(() => updateUser(user.uid)); // route to home page
    console.warn(payload);
  };

  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">Register User</h3>
      </div>
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
            <Form.Control type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput2" label="Age" className="mb-3">
            <Form.Control type="number" placeholder="Enter User Age" name="age" value={formData.age} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="User Bio" className="mb-3">
            <Form.Control type="text" placeholder="Enter Short Bio" name="bio" value={formData.bio} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Image Url" className="mb-3">
            <Form.Control type="url" placeholder="Enter Profile Image Url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
            <Form.Control type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Location" className="mb-3">
            <Form.Control type="text" placeholder="Enter Location" name="location" value={formData.location} onChange={handleChange} required />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput3" label="Local Pharmacy" className="mb-3">
            <Form.Control type="text" placeholder="Enter Local Pharmacy" name="localPharmacy" value={formData.localPharmacy} onChange={handleChange} required />
          </FloatingLabel>

          <Button variant="secondary" type="submit">{formData.id ? 'Update' : 'Register'} User</Button>
        </Form>
        <div className="card-footer text-muted">
          MEDBAY &#8482;
        </div>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
