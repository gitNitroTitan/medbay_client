import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import Link from 'next/link';
import Search from '../components/Search';
import RecordCardLite from '../components/RecordCardLite';
import { getRecordsByUser } from '../api/recordData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const { user } = useAuth();

  const getMedicationsByUser = () => {
    getRecordsByUser(user.id).then(setRecords);
  };

  useEffect(() => {
    getMedicationsByUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hello {user.fbUser.displayName}! </h1>
        <br />
        <Link href="/physicians/new" passHref>
          <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">Add A Physician</Button>
        </Link>
        <br />
        <Link href="/records/new" passHref>
          <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">Add A Medication Record</Button>
        </Link>
        <br />
        <Search records={records} setFilteredRecords={setFilteredRecords} />
        <section className="search-medrecord-container">
          {filteredRecords?.map((record) => (
            <RecordCardLite key={record.id} recordObj={record} />
          ))}
        </section>
      </div>
    </>
  );
}

export default Home;
