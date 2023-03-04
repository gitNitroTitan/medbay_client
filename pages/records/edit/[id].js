import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleRecord } from '../../../api/recordData';
import RecordForm from '../../../components/forms/MedRecordForm';

export default function EditCategory() {
  const [editRecord, setEditRecord] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleRecord(id).then(setEditRecord);
  }, [id]);

  return (
    <div className="edit-cat-form" style={{ height: '45rem', padding: '10%' }}>
      <RecordForm user={user} recordObj={editRecord} onUpdate={editRecord} />
    </div>
  );
}
