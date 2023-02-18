import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getPhysicians, getSinglePhysician } from '../../../api/physicianData';
import PhysicianForm from '../../../components/forms/PhysicianForm';

export default function EditCategory() {
  const [editPhysician, setEditPhysician] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSinglePhysician(id).then(setEditPhysician);
  }, [id]);

  return (
    <div className="edit-cat-form" style={{ height: '45rem', padding: '10%' }}>
      <PhysicianForm user={user} physicianObj={editPhysician} onUpdate={getPhysicians} />
    </div>
  );
}
