import { AuthContext } from '../../context/AuthContext';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importStar(require('react'));
const Form_1 = __importDefault(require('react-bootstrap/Form'));
const Button_1 = __importDefault(require('react-bootstrap/Button'));
const Card_1 = __importDefault(require('react-bootstrap/Card'));
const ErrorMessage_1 = __importDefault(require('../utils/ErrorMessage'));
const Loading_1 = __importDefault(require('../utils/Loading'));
const Login = () => {
  const {
    attemptLogin,
    userLoginDetails,
    userLoading,
    setUserLoginDetails,
    userErrorMessage,
    setUserErrorMessage,
  } = (0, react_1.useContext)(AuthContext);
  /*
     Remove error message on page load so if user
     is shown error message then clicks on
     Register, the error message is removed
     when they navigate back to Login
    */
  (0, react_1.useEffect)(() => {
    setUserErrorMessage('');
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!userLoginDetails.email || !userLoginDetails.password) {
      setUserErrorMessage('Please enter an email and password.');
    } else {
      attemptLogin(userLoginDetails);
    }
  };
  const handleFormInput = (e) => {
    setUserLoginDetails(
      Object.assign(Object.assign({}, userLoginDetails), {
        [e.currentTarget.id]: e.currentTarget.value,
      })
    );
  };
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      Card_1.default,
      {
        style: {
          width: '75%',
          margin: '3rem auto',
          textAlign: 'center',
          padding: '2rem',
        },
      },
      react_1.default.createElement(
        Form_1.default,
        { onSubmit: (e) => handleLogin(e) },
        react_1.default.createElement('h1', null, 'Login'),
        react_1.default.createElement(
          'div',
          { className: 'container' },
          react_1.default.createElement(
            'div',
            { className: 'input-container' },
            react_1.default.createElement('input', {
              onChange: handleFormInput,
              type: 'email',
              id: 'email',
              placeholder: 'Email...',
              className: 'input',
              name: 'email',
            })
          ),
          react_1.default.createElement(
            'div',
            { className: 'input-container' },
            react_1.default.createElement('input', {
              onChange: handleFormInput,
              type: 'password',
              id: 'password',
              placeholder: 'Password...',
              className: 'input',
              name: 'name',
            })
          )
        ),
        userErrorMessage &&
          react_1.default.createElement(ErrorMessage_1.default, null),
        userLoading && react_1.default.createElement(Loading_1.default, null),
        react_1.default.createElement('br', null),
        react_1.default.createElement(
          Button_1.default,
          { type: 'submit', disabled: false, size: 'lg' },
          'Login'
        )
      )
    )
  );
};
const _default = Login;
export { _default as default };
