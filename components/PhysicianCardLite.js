import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteSinglePhysician } from '../api/physicianData';

function PhysicianCard({ physicianObj, onUpdate }) {
  const deleteThisPhysician = () => {
    // console.warn(physicianObj);
    if (window.confirm(`Delete ${physicianObj.name}?`)) {
      deleteSinglePhysician(physicianObj?.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          <h1>{physicianObj.name}</h1>
        </Card.Title>
      </Card.Body>
      <h4>{physicianObj.specialty}</h4>
      <h6>{physicianObj.email}</h6>
      <h6>{physicianObj.phoneNumber}</h6>
      <h6>{physicianObj.location}</h6>
      <Link href={`/physicians/edit/${physicianObj.id}`} passHref>
        <Button variant="success" className="m-2">EDIT</Button>
      </Link>
      <Button variant="danger" className="m-2" onClick={deleteThisPhysician}>DELETE</Button>
      <Card.Footer className="text-muted">MEDBAY</Card.Footer>
    </Card>
  );
}

PhysicianCard.propTypes = {
  physicianObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    specialty: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PhysicianCard;
