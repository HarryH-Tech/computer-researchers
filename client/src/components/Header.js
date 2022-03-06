import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css';
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
const Navbar_1 = __importDefault(require('react-bootstrap/Navbar'));
const Nav_1 = __importDefault(require('react-bootstrap/Nav'));
const Button_1 = __importDefault(require('react-bootstrap/Button'));
const Container_1 = __importDefault(require('react-bootstrap/Container'));
const Header = () => {
  const { userLoggedInDetails, logout } = (0, react_1.useContext)(AuthContext);
  const handleLogout = () => {
    logout();
    console.log(userLoggedInDetails);
  };
  // @ts-expect-error
  const localStorageUser = JSON.parse(localStorage.getItem('user'));
  return react_1.default.createElement(
    Navbar_1.default,
    { bg: 'primary', expand: 'sm' },
    react_1.default.createElement(
      Container_1.default,
      null,
      react_1.default.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'space-between' } },
        react_1.default.createElement(
          Navbar_1.default.Brand,
          null,
          react_1.default.createElement(
            'h1',
            { id: 'title' },
            'List of Computer Researches'
          )
        ),
        react_1.default.createElement(Navbar_1.default.Toggle, {
          'aria-controls': 'basic-navbar-nav',
        })
      ),
      localStorageUser
        ? react_1.default.createElement(
            'div',
            { style: { display: 'flex' } },
            react_1.default.createElement(
              Button_1.default,
              { id: 'home-button' },
              react_1.default.createElement(Link, { to: '/' }, 'Home')
            ),
            react_1.default.createElement(
              Button_1.default,
              { onClick: handleLogout, id: 'logout-button' },
              'Logout'
            )
          )
        : react_1.default.createElement(
            Navbar_1.default.Collapse,
            { id: 'basic-navbar-nav' },
            react_1.default.createElement(
              Nav_1.default,
              { className: 'me-auto' },
              ' ',
              react_1.default.createElement(
                Link,
                { to: '/register', className: 'link' },
                'Register'
              ),
              ' ',
              react_1.default.createElement(
                Link,
                { to: '/', className: 'link' },
                'Login'
              )
            )
          )
    )
  );
};
const _default = Header;
export { _default as default };
