import { FC, useState, createContext, ReactNode } from 'react';
import axios from 'axios';

export const ResearchContext = createContext<ResearcherContextType | null>(
  null
);

const ResearchProvider: FC<ReactNode> = ({ children }) => {
  const [researchers, setResearchers] = useState<IResearcher[]>([]);
  const [researcher, setResearcher] = useState<IResearcher>({
    _id: '',
    name: '',
    description: '',
    dob: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // LIST ALL RESEARCHERS
  const getAllResearchers = () => {
    axios
      .get(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/get_all_researchers'
      )
      .then((res) => {
        setResearchers(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  // SHOW SPECIFIC RESEARCHER
  const getResearcher = async (researcherName: string) => {
    const response = await axios.get(
      process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL +
        `/get_researcher/${researcherName}`
    );
    console.log('res = ' + JSON.stringify(response.data));
    const { _id, name, description, dob } = response.data;
    setResearcher({
      _id,
      name,
      description,
      dob,
    });
  };

  // ADD NEW RESEARCHER
  const saveResearcher = (researcher: IResearcher) => {
    axios
      .post(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/create_researcher',
        {
          researcher,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // Call getAllResearchers again so researcher list can be rendered with added researcher
          setSuccessMessage('Researcher Successfullly Added 😁');
          getAllResearchers();
        } else {
          setErrorMessage(
            "Sorry, we couldn't add that right now. Please try again later."
          );
        }
      });
  };

  // DELETE RESEARCHER
  const deleteResearcher = (id: string) => {
    axios
      .delete(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/delete_researcher',
        {
          data: {
            id,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // Call getAllResearchers again so researcher list can be rendered with deleted researcher removed
          setSuccessMessage('Researcher Successfullly Deleted 😁');
          getAllResearchers();
        } else {
          setErrorMessage(
            "Sorry, we couldn't delete that right now. Please try again later."
          );
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  //DELETE MULTIPLE RESEARCHERS
  const deleteResearchers = (researchers: string[]) => {
    console.log(researchers);
    axios
      .delete(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/delete_researchers',
        {
          data: {
            ids: researchers,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage('Researchers Successfullly Deleted 😁');
        } else {
          setErrorMessage(
            "Sorry, we couldn't delete that right now. Please try again later."
          );
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  // EDIT RESEARCHER
  const editResearcher = () => {
    axios
      .put(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/edit_researcher',
        {
          researcher,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage('Researcher Successfullly Edited 😁');
          getAllResearchers();
          setShowEditModal(false);
        } else {
          setErrorMessage(
            "Sorry, we couldn't edit that right now. Please try again later."
          );
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <ResearchContext.Provider
      value={{
        researchers,
        researcher,
        errorMessage,
        loading,
        successMessage,
        showDeleteModal,
        showEditModal,
        saveResearcher,
        editResearcher,
        getAllResearchers,
        getResearcher,
        setErrorMessage,
        setLoading,
        setSuccessMessage,
        deleteResearcher,
        deleteResearchers,
        setShowDeleteModal,
        setShowEditModal,
        setResearcher,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};

export default ResearchProvider;
