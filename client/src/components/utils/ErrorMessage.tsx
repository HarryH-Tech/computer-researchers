import React, { useContext } from 'react';
import ResearchContext from '../../context/ResearchContext';
import AuthContext from '../../context/AuthContext';
import Alert from 'react-bootstrap/Alert';

function ErrorMessage() {
  const { errorMessage, setErrorMessage } = useContext(
    // @ts-expect-error
    ResearchContext
  ) as unknown as ResearcherContextType;

  const { userErrorMessage, setUserErrorMessage } = useContext(
    // @ts-expect-error
    AuthContext
  ) as unknown as AuthContextType;

  const removeErrorMessages = () => {
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
