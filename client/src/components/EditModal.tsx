import React, { useContext, MouseEvent, FormEvent } from 'react';

import { ResearchContext } from '../context/ResearchContext';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

const EditModal = () => {
  const {
    researcher,
    showEditModal,
    setResearcher,
    setShowEditModal,
    editResearcher,
  } = useContext(ResearchContext) as unknown as ResearcherContextType;

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    console.log(researcher);
    setResearcher({
      ...researcher,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const confirmEditResearcher = (e: MouseEvent<HTMLButtonElement>) => {
    editResearcher(researcher);
  };

  return (
    <>
      <Modal
        show={showEditModal}
        backdrop="static"
        onHide={() => setShowEditModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <input
              onChange={handleInputChange}
              value={researcher.name}
              name="name"
              id="name"
            />
            <br />
          </Modal.Title>
          <input
            onChange={handleInputChange}
            value={researcher.dob}
            name="dob"
            id="dob"
          />
        </Modal.Header>

        <Modal.Body>
          {' '}
          <textarea
            //Avoids throwing error that e:FormEvent is not assignable to textarea elements
            // @ts-expect-error
            onChange={handleInputChange}
            value={researcher.description}
            name="description"
            id="description"
            rows={6}
            style={{ width: '100%' }}
          />
        </Modal.Body>
        <Modal.Footer id="modal-footer">
          <Button variant="primary" onClick={() => setShowEditModal(false)}>
            Close <XCircleFill />
          </Button>
          <Button variant="danger" onClick={confirmEditResearcher}>
            Confirm Edit <CheckCircleFill />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
