// import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getRecords } from '../../api/recordData';
import RecordCard from '../../components/RecordCard';

function Home() {
  const [records, setRecords] = useState([]);
  useEffect(() => {
    getRecords().then(setRecords);
  }, []);

  return (
    <>
      <Link href="/records/new" passHref>
        <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">New Record</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {records.map((record) => (
          <RecordCard key={record.id} recordObj={record} onUpdate={getRecords} />
        ))}
      </div>
    </>
  );
}

export default Home;
