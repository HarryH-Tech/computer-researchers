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
const AuthContext_1 = require('./context/AuthContext');
const Header_1 = __importDefault(require('./components/Header'));
const Researchers_1 = __importDefault(require('./containers/Researchers'));
const Researcher_1 = __importDefault(require('./components/Researcher'));
const Login_1 = __importDefault(require('./components/auth/Login'));
const Register_1 = __importDefault(require('./components/auth/Register'));
const NotFound_1 = __importDefault(require('./components/NotFound'));
const react_router_dom_1 = require('react-router-dom');
require('bootstrap/dist/css/bootstrap.min.css');
require('./styles/Main.css');
function App() {
  const [user, setUser] = (0, react_1.useState)();
  const { userLoggedInDetails } = (0, react_1.useContext)(
    AuthContext_1.AuthContext
  );
  // @ts-expect-error
  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      react_router_dom_1.BrowserRouter,
      null,
      react_1.default.createElement(Header_1.default, null),
      react_1.default.createElement('div', { className: 'bg' }),
      react_1.default.createElement('div', { className: 'bg bg2' }),
      react_1.default.createElement('div', { className: 'bg bg3' }),
      react_1.default.createElement(
        react_router_dom_1.Routes,
        null,
        react_1.default.createElement(react_router_dom_1.Route, {
          path: '/register',
          element: react_1.default.createElement(Register_1.default, null),
        }),
        react_1.default.createElement(react_router_dom_1.Route, {
          path: '/',
          element: localStorageUser
            ? react_1.default.createElement(Researchers_1.default, null)
            : react_1.default.createElement(Login_1.default, null),
        }),
        react_1.default.createElement(react_router_dom_1.Route, {
          path: ':id',
          element: react_1.default.createElement(Researcher_1.default, null),
        }),
        react_1.default.createElement(react_router_dom_1.Route, {
          path: '/*',
          element: react_1.default.createElement(NotFound_1.default, null),
        })
      )
    )
  );
}
exports.default = App;
