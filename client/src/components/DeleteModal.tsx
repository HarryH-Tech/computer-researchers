import React, { useContext } from 'react';

import ResearchContext from '../context/ResearchContext';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../styles/DeleteModal.css';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

const DeleteModal = () => {
  const {
    showDeleteModal,
    setShowDeleteModal,
    researcher,
    deleteResearcher,
    setSuccessMessage,
    // @ts-expect-error
  } = useContext(ResearchContext) as unknown as ResearcherContextType;

  const confirmDeleteResearcher = () => {
    deleteResearcher(researcher._id!);
    console.log(researcher);
    setShowDeleteModal(false);
    setSuccessMessage(`${researcher.name} has been successfully deleted.`);
  };

  return (
    <>
      <Modal
        show={showDeleteModal}
        backdrop="static"
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {researcher.name} (Born: <i>{researcher.dob}</i>)
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{researcher.description}</Modal.Body>
        <Modal.Footer id="modal-footer">
          <h4 id="confirmation-warning">
            Are you sure you want to delete <i>{researcher.name}</i>?
          </h4>

          <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
            Close <XCircleFill />
          </Button>
          <Button variant="danger" onClick={confirmDeleteResearcher}>
            Confirm <CheckCircleFill />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
