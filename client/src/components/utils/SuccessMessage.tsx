import React, { useContext } from 'react';
import ResearchContext from '../../context/ResearchContext';
import AuthContext from '../../context/AuthContext';
import Alert from 'react-bootstrap/Alert';

function SuccessMessage() {
  const { successMessage, setSuccessMessage } = useContext(
    // @ts-expect-error
    ResearchContext
  ) as unknown as ResearcherContextType;

  const { userSuccessMessage, setUserSuccessMessage } = useContext(
    // @ts-expect-error
    AuthContext
  ) as unknown as AuthContextType;

  const removeSuccessMessages = () => {
    setUserSuccessMessage('');
    setSuccessMessage('');
  };

  return (
    <Alert
      onClose={removeSuccessMessages}
      variant={'success'}
      dismissible
      style={{ width: '60%', margin: '2rem auto', textAlign: 'center' }}
    >
      {successMessage || userSuccessMessage}
    </Alert>
  );
}

export default SuccessMessage;
