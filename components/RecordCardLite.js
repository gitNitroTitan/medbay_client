import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function RecordCardLite({ recordObj }) {
  return (
    <Card className="text-center recordCardLite">
      <Card.Body>
        <Card.Title>
          <h1>{recordObj?.name}</h1>
        </Card.Title>
      </Card.Body>
      <h4>Dosage: {recordObj?.dosage}mg</h4>
      <Card.Footer />
    </Card>
  );
}

RecordCardLite.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    dosage: PropTypes.string,
  }).isRequired,
};

export default RecordCardLite;
