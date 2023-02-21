import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Search({ records, setFilteredRecords }) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    const results = records.filter((record) => record.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredRecords(results);
  };

  const reset = () => {
    setSearch('');
    setFilteredRecords(records);
  };

  return (
    <div className="searchbar">
      <h5>Search A Specific Medication For Details</h5>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Medication"
          aria-label="Medication"
          value={search}
          onChange={handleChange}
          aria-describedby="basic-addon2"
        />
        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
      </InputGroup>
    </div>
  );
}

Search.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    dosage: PropTypes.string,
  })).isRequired,
  setFilteredRecords: PropTypes.func.isRequired,
};

export default Search;
