import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import Link from 'next/link';
import Search from '../components/Search';
import RecordCardLite from '../components/RecordCardLite';
import { getAllRecords } from '../api/recordData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const { user } = useAuth();

  const getMedicationsByUser = () => {
    getAllRecords().then((recordsArray) => {
      setRecords(recordsArray);
      setFilteredRecords(recordsArray);
    });
  };

  useEffect(() => {
    getMedicationsByUser();
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
        {/* <p>Your Bio: {user.bio}</p> */}
        <br />
        <p>Please Add A Physician</p>
        <Link href="/physicians/new" passHref>
          <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">Create New Physician</Button>
        </Link>
        <br />
        <p>Add A Medication From A Known Physician</p>
        <Link href="/records/new" passHref>
          <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">Create Medication Record</Button>
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
