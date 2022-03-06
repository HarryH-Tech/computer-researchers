"use strict";
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
exports.signOut = exports.attemptLogin = exports.register = void 0;
const user_schema_1 = __importDefault(require("./user-schema"));
const jwt = require('jsonwebtoken'); //generate signed token
const expressJwt = require('express-jwt'); //authorization check
// REGISTER
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email } = req.body.formDetails;
    yield user_schema_1.default.findOne({ email }, (err, user) => {
        if (user) {
            return res.json({
                errorType: 'duplicate email',
                message: `Account with email: ${email} already exists.`,
                success: false,
            });
        }
        else {
            const newUser = new user_schema_1.default(req.body.formDetails);
            newUser.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        error,
                        message: 'Sorry there was a problem creating the account, please try again. ',
                        success: false,
                    });
                }
                else {
                    res.json({
                        user,
                        message: 'Account created 😀',
                        success: true,
                    });
                }
            });
        }
    });
});
exports.register = register;
// LOGIN
const attemptLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body.loginUserDetails;
    yield user_schema_1.default.findOne({ email }, (err, user) => {
        if (!user) {
            return res.json({
                error: 'User with that email does not exist.',
            });
        }
        if (err) {
            return res.json({ error: err.message });
        }
        //If User found ensure email and password match
        if (!user.authenticate(req.body.loginUserDetails.password)) {
            return res.json({
                error: 'Wrong email/password combination.',
            });
        }
        else {
            //Create a sign in token with user id and secret
            const token = jwt.sign({
                _id: user._id,
            }, process.env.JWT_SECRET);
            res.cookie('t', token);
            return res.json({ token, user });
        }
    });
});
exports.attemptLogin = attemptLogin;
// LOGOUT
const signOut = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout Successful' });
};
exports.signOut = signOut;
