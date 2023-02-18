import React from 'react';
import PhysicianForm from '../../components/forms/PhysicianForm';
import { useAuth } from '../../utils/context/authContext';

export default function NewPhysician() {
  const { user } = useAuth();
  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <PhysicianForm user={user} />
    </div>
  );
}
