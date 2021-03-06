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
function SuccessMessage() {
  const { successMessage, setSuccessMessage } = (0, react_1.useContext)(
    ResearchContext_1.ResearchContext
  );
  const { userSuccessMessage, setUserSuccessMessage } = (0, react_1.useContext)(
    AuthContext_1.AuthContext
  );
  const removeSuccessMessages = () => {
    setUserSuccessMessage('');
    setSuccessMessage('');
  };
  return react_1.default.createElement(
    Alert_1.default,
    {
      onClose: removeSuccessMessages,
      variant: 'success',
      dismissible: true,
      style: { width: '60%', margin: '2rem auto', textAlign: 'center' },
    },
    successMessage || userSuccessMessage
  );
}
exports.default = SuccessMessage;
