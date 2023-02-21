import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRecord } from '../api/recordData';

function RecordCardLite({ recordObj, onUpdate }) {
  const deleteThisRecord = () => {
    // console.warn(recordObj);
    if (window.confirm(`Delete ${recordObj.name}?`)) {
      deleteRecord(recordObj?.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>
          <h1>{recordObj.name}</h1>
        </Card.Title>
      </Card.Body>
      <h4>Dosage: {recordObj.dosage}</h4>
      <Link href={`/records/edit/${recordObj.id}`} passHref>
        <Button variant="success" className="m-2">EDIT</Button>
      </Link>
      <Button variant="danger" className="m-2" onClick={deleteThisRecord}>DELETE</Button>
      <Card.Footer className="text-muted">MEDBAY</Card.Footer>
    </Card>
  );
}

RecordCardLite.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    dosage: PropTypes.string,
    treatment: PropTypes.string,
    date_prescribed: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecordCardLite;
