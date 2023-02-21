import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import PhysicianCard from '../components/PhysicianCard';
import { getPhysicians } from '../api/physicianData';

function Physicians() {
  const [physicians, setPhysicians] = useState([]);

  useEffect(() => {
    getPhysicians().then(setPhysicians);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Link href="/physicians/new" passHref>
        <Button style={{ backgroundColor: '#F1E6D4' }} variant="info" className="m-2">Create Physician</Button>
      </Link>
      <article className="physician">
        <h1>Physicians</h1>
        {physicians?.map((physician) => (
          <PhysicianCard key={physician.id} physicianObj={physician} onUpdate={getPhysicians} />
        ))}
      </article>
    </>
  );
}

export default Physicians;
