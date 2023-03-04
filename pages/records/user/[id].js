import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRecordsByUser } from '../../../api/recordData';
import RecordCard from '../../../components/RecordCard';

export default function RecordPage() {
  const [records, setRecords] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getRecordData = () => {
    getRecordsByUser(id).then(setRecords);
  };

  useEffect(() => {
    getRecordData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {records?.map((record) => (
        <RecordCard key={record.id} recordObj={record} onUpdate={getRecordData} />
      ))}
    </div>
  );
}
