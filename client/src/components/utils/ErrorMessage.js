'use strict';
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
const ResearchContext_1 = require('../../context/ResearchContext');
const AuthContext_1 = require('../../context/AuthContext');
const Alert_1 = __importDefault(require('react-bootstrap/Alert'));
function ErrorMessage() {
  const { errorMessage, setErrorMessage } = (0, react_1.useContext)(
    ResearchContext_1.ResearchContext
  );
  const { userErrorMessage, setUserErrorMessage } = (0, react_1.useContext)(
    AuthContext_1.AuthContext
  );
  const removeErrorMessages = () => {
    console.log('HI');
    setErrorMessage('');
    setUserErrorMessage('');
  };
  return react_1.default.createElement(
    Alert_1.default,
    {
      onClose: removeErrorMessages,
      variant: 'danger',
      dismissible: true,
      style: { width: '60%', margin: '2rem auto', textAlign: 'center' },
    },
    errorMessage || userErrorMessage
  );
}
exports.default = ErrorMessage;
