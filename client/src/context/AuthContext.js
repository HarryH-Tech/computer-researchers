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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthContext = void 0;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
exports.AuthContext = (0, react_1.createContext)(null);
const AuthProvider = ({ children }) => {
    const [userRegisterDetails, setUserRegisterDetails] = (0, react_1.useState)({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [userLoginDetails, setUserLoginDetails] = (0, react_1.useState)({
        email: '',
        password: '',
    });
    const [userLoggedInDetails, setUserLoggedInDetails] = (0, react_1.useState)({
        username: '',
        token: '',
        role: 0,
    });
    const [userLoading, setUserLoading] = (0, react_1.useState)(false);
    const [userErrorMessage, setUserErrorMessage] = (0, react_1.useState)('');
    const [userSuccessMessage, setUserSuccessMessage] = (0, react_1.useState)('');
    const attemptLogin = (loginUserDetails) => __awaiter(void 0, void 0, void 0, function* () {
        setUserLoading(true);
        console.log(userLoginDetails);
        const response = yield axios_1.default.post(process.env.REACT_APP_AUTH_URL + '/login', {
            loginUserDetails,
        });
        setUserLoading(false);
        if (response.data.error) {
            setUserErrorMessage(response.data.error);
        }
        else {
            console.log(response.data);
            const localData = {
                token: response.data.token,
                role: response.data.user.role,
                username: response.data.user.username,
            };
            localStorage.setItem('user', JSON.stringify(localData));
            setUserLoginDetails({
                email: '',
                password: '',
            });
            setUserErrorMessage('');
            setUserLoggedInDetails({
                token: response.data.token,
                username: response.data.user.username,
                role: response.data.user.role,
            });
        }
    });
    const attemptRegister = (formDetails) => __awaiter(void 0, void 0, void 0, function* () {
        setUserLoading(true);
        const response = yield axios_1.default.post(process.env.REACT_APP_AUTH_URL + '/register', {
            formDetails,
        });
        // If Register Attempt Was Unsuccessful Show Why
        if (!response.data.success) {
            setUserLoading(false);
            if (response.data.errorType === 'duplicate email') {
                setUserErrorMessage(response.data.message);
            }
            else {
                setUserErrorMessage(response.data.message);
            }
        }
        // If Register Attempt Was Successful
        else if (response.data.success) {
            setUserLoading(false);
            setUserSuccessMessage(response.data.message);
        }
    });
    //LOGOUT
    const logout = () => {
        axios_1.default.post(process.env.REACT_APP_AUTH_URL + '/logout');
        setUserLoggedInDetails({
            username: '',
            token: '',
            role: 0,
        });
        localStorage.removeItem('user');
        console.log('LOGOUT');
    };
    return (react_1.default.createElement(exports.AuthContext.Provider, { value: {
            userRegisterDetails,
            userLoginDetails,
            userLoggedInDetails,
            userErrorMessage,
            userLoading,
            userSuccessMessage,
            setUserRegisterDetails,
            setUserLoginDetails,
            setUserLoggedInDetails,
            attemptLogin,
            attemptRegister,
            setUserErrorMessage,
            setUserLoading,
            setUserSuccessMessage,
            logout,
        } }, children));
};
exports.default = AuthProvider;
