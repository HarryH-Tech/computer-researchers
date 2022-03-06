import React, { useContext, useState, FormEvent, FC } from 'react';
import { ResearchContext } from '../context/ResearchContext';
import { v4 as uuidv4 } from 'uuid';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PlusCircleFill } from 'react-bootstrap-icons';

import ErrorMessage from './utils/ErrorMessage';
import SuccessMessage from './utils/SuccessMessage';

import '../styles/AddResearcher.css';

const AddResearcher: FC = () => {
  const {
    saveResearcher,
    errorMessage,
    getAllResearchers,
    setErrorMessage,
    successMessage,
  } = useContext(ResearchContext) as unknown as ResearcherContextType;

  const [formData, setFormData] = useState<IResearcher>({
    name: '',
    description: '',
    dob: '',
  });

  let { name, description, dob } = formData;

  const handleFormInput = (e: FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveResearcher = (e: FormEvent, formData: IResearcher | any) => {
    if (!name || !description || !dob) {
      setErrorMessage('Please make sure all fields have been filled in.');
    }

    e.preventDefault();
    saveResearcher(formData);
  };

  return (
    <>
      <Card
        style={{
          width: '75%',
          margin: '2rem auto',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <Card.Title>
          <h1>Add Researcher</h1>
        </Card.Title>
        <Form onSubmit={(e) => handleSaveResearcher(e, formData)}>
          <div className="container">
            <div className="input-container">
              <input
                onChange={handleFormInput}
                type="text"
                id="name"
                placeholder="Name..."
                className="input"
              />
            </div>
            <div className="input-container">
              <textarea
                //Avoids throwing error that e:FormEvent is not assignable to textarea elements
                // @ts-expect-error
                onChange={handleFormInput}
                type="text"
                id="description"
                placeholder="Description..."
                className="input"
                rows={6}
              />
            </div>
            <div className="input-container">
              <input
                onChange={handleFormInput}
                type="date"
                id="dob"
                placeholder="DOB..."
                className="input"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={
              name === '' || description === '' || dob === '' ? true : false
            }
            size="lg"
          >
            Add Researcher <PlusCircleFill />
          </Button>
          <br />
          <br />
        </Form>
      </Card>
      {errorMessage && <ErrorMessage />}
      {successMessage && <SuccessMessage />}
    </>
  );
};

export default AddResearcher;
