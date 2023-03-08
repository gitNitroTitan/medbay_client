import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Search({ records, setFilteredRecords }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const keywords = keyword.split(' ').filter(Boolean);
    const results = records.filter((record) => keywords.some(() => (
      record.treatment.toLowerCase().includes(keyword.toLowerCase()) || record.name.toLowerCase().includes(keyword.toLowerCase())
      || record.dosage.toLowerCase().includes(keyword.toLowerCase())
    )));
    setFilteredRecords(results);
  };

  const reset = () => {
    setKeyword('');
    setFilteredRecords();
  };

  return (
    <div className="searchbar">
      <h5>Quick Search A Medication <br />(Diagnosis, medication name, or dosage in mg)</h5>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Medication"
          aria-label="Medication"
          value={keyword}
          onChange={handleChange}
          aria-describedby="basic-addon2"
        />
        <Button variant="secondary" onClick={handleSubmit}>
          Submit
        </Button>
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
