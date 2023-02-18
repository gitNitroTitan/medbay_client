import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getPhysiciansByUser } from '../../../api/physicianData';
import PhysicianCard from '../../../components/PhysicianCard';

export default function PhysicianPage() {
  const [physicians, setPhysicians] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getPhysiciansByUser(id).then(setPhysicians);
  }, [id]);
  return (
    <div className="d-flex flex-wrap">
      {physicians?.map((physician) => (
        <PhysicianCard key={physician.id} physicianObj={physician} onUpdate={getPhysiciansByUser} />
      ))}
    </div>
  );
}
