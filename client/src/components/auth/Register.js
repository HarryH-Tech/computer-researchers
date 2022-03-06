"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AuthContext_1 = require("../../context/AuthContext");
const ErrorMessage_1 = __importDefault(require("../utils/ErrorMessage"));
const SuccessMessage_1 = __importDefault(require("../utils/SuccessMessage"));
const Form_1 = __importDefault(require("react-bootstrap/Form"));
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const Card_1 = __importDefault(require("react-bootstrap/Card"));
require("../../styles/Register.css");
const Register = () => {
    const [formDetails, setFormDetails] = (0, react_1.useState)({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [passwordRequirements, setPasswordRequirements] = (0, react_1.useState)({
        show: false,
        number: false,
        length: false,
        capital: false,
    });
    const { userErrorMessage, userSuccessMessage, userLoading, userRegisterDetails, setUserRegisterDetails, setUserLoading, setUserErrorMessage, attemptRegister, } = (0, react_1.useContext)(AuthContext_1.AuthContext);
    const { username, email, password, confirmPassword } = formDetails;
    const { show, number, length, capital } = passwordRequirements;
    /*
     Remove error message on page load so if user
     is shown error message then clicks on
     Login, the error message is removed
     when they navigate back to Register
    */
    (0, react_1.useEffect)(() => {
        setUserErrorMessage('');
    }, []);
    const handleRegister = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setUserErrorMessage('Please ensure all fields are filled in before signing up.');
        }
        else if (password !== confirmPassword) {
            setUserErrorMessage('Passwords do not match.');
        }
        else {
            setUserErrorMessage('');
            attemptRegister(formDetails);
            console.log('register');
        }
    };
    // Helper functions to see if password contains number + capital letter
    function containsNumber(string) {
        return /\d/.test(string);
    }
    function containsCapitalLetter(string) {
        return /[A-Z]/.test(string);
    }
    const handleFormInput = (e) => {
        console.log('input');
        setFormDetails(Object.assign(Object.assign({}, formDetails), { [e.currentTarget.id]: e.currentTarget.value }));
        if (e.currentTarget.id === 'password') {
            setPasswordRequirements({
                show: true,
                number: containsNumber(e.currentTarget.value),
                length: e.currentTarget.value.length > 6,
                capital: containsCapitalLetter(e.currentTarget.value),
            });
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Card_1.default, { style: {
                width: '75%',
                margin: '3rem auto',
                textAlign: 'center',
                padding: '2rem',
            } },
            react_1.default.createElement(Form_1.default, { onSubmit: (e) => handleRegister(e) },
                react_1.default.createElement("h1", null, "Register"),
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "input-container" },
                        react_1.default.createElement("input", { onChange: handleFormInput, type: "email", id: "email", placeholder: "Email...", className: "input", name: "email" })),
                    react_1.default.createElement("div", { className: "input-container" },
                        react_1.default.createElement("input", { onChange: handleFormInput, type: "text", id: "username", placeholder: "Username...", className: "input", name: "username" })),
                    show && (react_1.default.createElement("div", null,
                        react_1.default.createElement("p", null, "Password must:"),
                        react_1.default.createElement("ul", null,
                            react_1.default.createElement("li", { className: `list-item ${number ? 'green' : 'red'}` }, "Contain A Number"),
                            react_1.default.createElement("li", { className: `list-item ${capital ? 'green' : 'red'}` }, "Contain At Least 1 Capital Letter"),
                            react_1.default.createElement("li", { className: `list-item ${length ? 'green' : 'red'}` }, "Be longer than 6 letters")))),
                    react_1.default.createElement("div", { className: "input-container" },
                        react_1.default.createElement("input", { onChange: handleFormInput, type: "password", id: "password", placeholder: "Password...", className: "input", name: "name" })),
                    react_1.default.createElement("div", { className: "input-container" },
                        react_1.default.createElement("input", { onChange: handleFormInput, type: "password", id: "confirmPassword", placeholder: "Confirm Password...", className: "input", name: "confirmPassword" }))),
                userSuccessMessage && react_1.default.createElement(SuccessMessage_1.default, null),
                userErrorMessage && react_1.default.createElement(ErrorMessage_1.default, null),
                userLoading && 'LOADING',
                react_1.default.createElement(Button_1.default, { type: "submit", disabled: false, size: "lg" }, "Register")))));
};
exports.default = Register;
