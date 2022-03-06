import '../../styles/Loading.css';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const react_1 = __importDefault(require('react'));
const Loading = () => {
  return react_1.default.createElement(
    'div',
    { className: 'lds-circle' },
    react_1.default.createElement('div', null)
  );
};
const _default = Loading;
export { _default as default };
