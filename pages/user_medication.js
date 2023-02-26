/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import DropdownSearch from '../components/DropdownSearch';
// import RecordCardLite from '../components/RecordCardLite';

function UserMedList() {
  const [records, setRecords] = useState([]);

  return (
    <div className="formContainer text-center text-dark bg-light mb-3">
      <div className="card-header">
        <h3 className="title">User Medication List </h3>
        <div className="card-body">
          <DropdownSearch key={records.user?.id} records={records} setRecords={setRecords} />
          {/* <section className="search-medrecord-container">
            {records?.map((record) => (
              <RecordCardLite key={record.user?.id} recordObj={record} />
            ))}
          </section> */}
        </div>
        <div className="card-footer text-muted">MEDBAY &#8482;
        </div>
      </div>
    </div>
  );
}

export default UserMedList;
