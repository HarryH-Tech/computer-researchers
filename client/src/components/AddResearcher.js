import { ResearchContext } from '../context/ResearchContext';
import { PlusCircleFill } from 'react-bootstrap-icons';
import '../styles/AddResearcher.css';
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
const ErrorMessage_1 = __importDefault(require('./utils/ErrorMessage'));
const SuccessMessage_1 = __importDefault(require('./utils/SuccessMessage'));
const AddResearcher = () => {
  const {
    saveResearcher,
    errorMessage,
    getAllResearchers,
    setErrorMessage,
    successMessage,
  } = (0, react_1.useContext)(ResearchContext);
  const [formData, setFormData] = (0, react_1.useState)({
    name: '',
    description: '',
    dob: '',
  });
  let { name, description, dob } = formData;
  const handleFormInput = (e) => {
    setFormData(
      Object.assign(Object.assign({}, formData), {
        [e.currentTarget.id]: e.currentTarget.value,
      })
    );
  };
  const handleSaveResearcher = (e, formData) => {
    if (!name || !description || !dob) {
      setErrorMessage('Please make sure all fields have been filled in.');
    }
    e.preventDefault();
    saveResearcher(formData);
  };
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      Card_1.default,
      {
        style: {
          width: '75%',
          margin: '2rem auto',
          padding: '2rem',
          textAlign: 'center',
        },
      },
      react_1.default.createElement(
        Card_1.default.Title,
        null,
        react_1.default.createElement('h1', null, 'Add Researcher')
      ),
      react_1.default.createElement(
        Form_1.default,
        { onSubmit: (e) => handleSaveResearcher(e, formData) },
        react_1.default.createElement(
          'div',
          { className: 'container' },
          react_1.default.createElement(
            'div',
            { className: 'input-container' },
            react_1.default.createElement('input', {
              onChange: handleFormInput,
              type: 'text',
              id: 'name',
              placeholder: 'Name...',
              className: 'input',
            })
          ),
          react_1.default.createElement(
            'div',
            { className: 'input-container' },
            react_1.default.createElement('textarea', {
              //Avoids throwing error that e:FormEvent is not assignable to textarea elements
              // @ts-expect-error
              onChange: handleFormInput,
              type: 'text',
              id: 'description',
              placeholder: 'Description...',
              className: 'input',
              rows: 6,
            })
          ),
          react_1.default.createElement(
            'div',
            { className: 'input-container' },
            react_1.default.createElement('input', {
              onChange: handleFormInput,
              type: 'date',
              id: 'dob',
              placeholder: 'DOB...',
              className: 'input',
            })
          )
        ),
        react_1.default.createElement(
          Button_1.default,
          {
            type: 'submit',
            disabled:
              name === '' || description === '' || dob === '' ? true : false,
            size: 'lg',
          },
          'Add Researcher ',
          react_1.default.createElement(PlusCircleFill, null)
        ),
        react_1.default.createElement('br', null),
        react_1.default.createElement('br', null)
      )
    ),
    errorMessage && react_1.default.createElement(ErrorMessage_1.default, null),
    successMessage &&
      react_1.default.createElement(SuccessMessage_1.default, null)
  );
};
const _default = AddResearcher;
export { _default as default };
