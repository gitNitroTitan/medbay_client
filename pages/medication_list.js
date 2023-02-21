import { useEffect, useState } from 'react';
import RecordCard from '../components/RecordCard';
import Search from '../components/Search';
import { getAllRecords } from '../api/recordData';

function RecordsList() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

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
    <div>
      <Search records={records} setFilteredRecords={setFilteredRecords} />
      <section className="search-medrecord-container">
        {filteredRecords?.map((record) => (
          <RecordCard key={record.id} recordObj={record} />
        ))}
      </section>
    </div>
  );
}

export default RecordsList;
