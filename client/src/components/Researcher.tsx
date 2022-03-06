import React, { FC, useEffect, useContext } from 'react';
import { ResearchContext } from '../context/ResearchContext';
import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const Researcher: FC = () => {
  const params = useParams();

  const { getResearcher, researcher } = useContext(
    ResearchContext
  ) as unknown as ResearcherContextType;

  useEffect(() => {
    getResearcher(params.id!);

    console.log(params);
  }, []);

  return (
    <>
      <Card style={{ width: '75%', margin: '3rem auto', padding: '2rem' }}>
        <Card.Title style={{ textAlign: 'center' }}>
          {researcher.name}
        </Card.Title>
        <p>Born: {researcher.dob}</p>
        <p>{researcher.description}</p>
      </Card>
    </>
  );
};

export default Researcher;
