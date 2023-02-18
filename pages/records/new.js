import React from 'react';
import MedRecordForm from '../../components/forms/MedRecordForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewMedRecord() {
  const { user } = useAuth;

  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <MedRecordForm user={user} />
    </div>
  );
}
