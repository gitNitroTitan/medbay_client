import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PhysicianCard from '../../../components/PhysicianCard';
import { getPhysiciansByUser } from '../../../api/physicianData';

export default function PhysicianPage() {
  const [physicians, setPhysicians] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getPhysicianData = () => {
    getPhysiciansByUser(id).then(setPhysicians);
  };

  useEffect(() => {
    getPhysicianData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {physicians?.map((physician) => (
        <PhysicianCard key={physician.id} physicianObj={physician} onUpdate={getPhysicianData} />
      ))}
    </div>
  );
}
