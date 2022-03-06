import React, { useContext } from 'react';
import { ResearchContext } from '../../context/ResearchContext';
import { AuthContext } from '../../context/AuthContext';
import Alert from 'react-bootstrap/Alert';

function ErrorMessage() {
  const { errorMessage, setErrorMessage } = useContext(
    ResearchContext
  ) as unknown as ResearcherContextType;

  const { userErrorMessage, setUserErrorMessage } = useContext(
    AuthContext
  ) as unknown as AuthContextType;

  const removeErrorMessages = () => {
    console.log('HI');
    setErrorMessage('');
    setUserErrorMessage('');
  };
  return (
    <Alert
      onClose={removeErrorMessages}
      variant={'danger'}
      dismissible
      style={{ width: '60%', margin: '2rem auto', textAlign: 'center' }}
    >
      {errorMessage || userErrorMessage}
    </Alert>
  );
}

export default ErrorMessage;
