/* eslint-disable @next/next/no-img-element */
import React from 'react';
import DropdownSearch from '../components/DropdownSearch';

function UserMedList() {
  // const [records, setRecords] = useState([]);

  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">User Medication List </h3>
        <div className="card-body">
          <DropdownSearch />
        </div>
        <div className="card-footer text-muted">MEDBAY &#8482;
        </div>
      </div>
    </div>
  );
}

export default UserMedList;
