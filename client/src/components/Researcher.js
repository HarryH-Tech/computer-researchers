import { ResearchContext } from '../context/ResearchContext';
import { useParams } from 'react-router-dom';
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
const Card_1 = __importDefault(require('react-bootstrap/Card'));
const Researcher = () => {
  const params = (0, useParams)();
  const { getResearcher, researcher } = (0, react_1.useContext)(
    ResearchContext
  );
  (0, react_1.useEffect)(() => {
    getResearcher(params.id);
    console.log(params);
  }, []);
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      Card_1.default,
      { style: { width: '75%', margin: '3rem auto', padding: '2rem' } },
      react_1.default.createElement(
        Card_1.default.Title,
        { style: { textAlign: 'center' } },
        researcher.name
      ),
      react_1.default.createElement('p', null, 'Born: ', researcher.dob),
      react_1.default.createElement('p', null, researcher.description)
    )
  );
};
const _default = Researcher;
export { _default as default };
