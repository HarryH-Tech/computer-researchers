import React, { useContext, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import ResearchContext from '../context/ResearchContext';
import AuthContext from '../context/AuthContext';

import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';
import AddResearcher from '../components/AddResearcher';

import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Hammer, XCircleFill } from 'react-bootstrap-icons';

const Researchers = () => {
  const selectedResearchers: string[] = [];

  const {
    researchers,
    showDeleteModal,
    showEditModal,
    editResearcher,
    deleteResearchers,
    getAllResearchers,
    setShowDeleteModal,
    setShowEditModal,
    setResearcher,
    // @ts-expect-error
  } = useContext(ResearchContext) as unknown as ResearcherContextType;

  const { userLoggedInDetails, setUserLoggedInDetails } = useContext(
    // @ts-expect-error
    AuthContext
  ) as unknown as AuthContextType;

  // @ts-expect-error
  const localStorageUser = JSON.parse(localStorage.getItem('user'));

  // Display list of all researchers on initial render
  useEffect(() => {
    getAllResearchers();
  }, []);

  //  SHOW MODAL TO DELETE SPECIFIC RESEARCHER
  const handleDeleteResearcher = (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    e.preventDefault();
    setShowDeleteModal(true);
    const researcher: IResearcher = researchers.find(
      (researcher) => researcher._id === id
    )!;
    setResearcher(researcher);
    console.log(researcher);
  };

  // SHOW MODAL TO EDIT RESEARCHER
  const handleEditResearcher = (
    e: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    e.preventDefault();
    setShowEditModal(true);
    const researcher: IResearcher = researchers.find(
      (researcher) => researcher._id === id
    )!;
    setResearcher(researcher);
    console.log(researcher);
  };

  console.log(userLoggedInDetails);

  // Handle Selection of god via checkbox for deletion of multiple gods
  const handleSelection = (e: ChangeEvent<HTMLInputElement>) => {
    let index = selectedResearchers.indexOf(e.target.value);
    if (index > -1) {
      selectedResearchers.splice(index, 1);
    } else {
      selectedResearchers.push(e.target.value);
    }

    console.log(selectedResearchers.length);
  };

  const handleDeleteMultipleResearchers = () => {
    if (selectedResearchers.length > 0) {
      if (
        window.confirm(
          'Are you sure you want to delete the selected researchers?'
        )
      ) {
        deleteResearchers(selectedResearchers);
      }
    }
  };

  return (
    <>
      {localStorageUser.role === 1 && (
        <>
          <AddResearcher />
          {selectedResearchers.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <Button
                disabled={selectedResearchers ? false : true}
                onClick={handleDeleteMultipleResearchers}
              >
                Delete Researchers
              </Button>
            </div>
          )}
        </>
      )}
      <br />
      <h3 style={{ textAlign: 'center', color: 'white' }}>
        Hi {localStorageUser.username}! 😊
      </h3>

      {researchers.map((researcher: IResearcher) => (
        <Card style={{ width: '75%', margin: '3rem auto' }} key={Math.random()}>
          <Card.Body>
            <Card.Title
              style={{ textAlign: 'center', textDecoration: 'underline' }}
            >
              <Link to={`${researcher.name}`}>
                <h2>{researcher.name}</h2>
              </Link>
            </Card.Title>
            <p>{researcher.description}</p>

            {localStorageUser.role === 1 && (
              <ButtonGroup
                style={{
                  display: 'flex',
                  width: '75%',
                  margin: 'auto',
                  gap: '5rem',
                }}
              >
                {/* Exclamation point below needed below as id comes from mongodb, not from client so TS can 
          trust that its not null, even though it may look like it. */}
                <Button
                  style={{ borderRadius: '1.5rem' }}
                  variant="danger"
                  onClick={(e) => handleDeleteResearcher(e, researcher._id!)}
                >
                  Delete <XCircleFill />
                </Button>
                <Button
                  style={{ borderRadius: '1.5rem' }}
                  variant="success"
                  onClick={(e) => handleEditResearcher(e, researcher._id!)}
                >
                  Edit <Hammer />
                </Button>

                <input
                  type="checkbox"
                  value={researcher._id!}
                  onChange={handleSelection}
                />
              </ButtonGroup>
            )}
          </Card.Body>
        </Card>
      ))}
      <br />
      {showDeleteModal && <DeleteModal />}
      {showEditModal && <EditModal />}
    </>
  );
};

export default Researchers;
