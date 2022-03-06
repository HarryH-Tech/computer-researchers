"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.User = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
    hashedPassword: {
        type: String,
        required: true,
        default: '0',
    },
    role: {
        type: Number,
        default: 0,
    },
    salt: {
        type: String,
    },
});
//virtual field
exports.User.virtual('password')
    .set(function (password) {
    console.log('password = ' + password);
    this._password = this.password;
    this.salt = 'ubIJNKHUYIjkioj';
    this.hashedPassword = this.encryptPassword(password);
})
    .get(function () {
    console.log(this._password);
    return this._password;
});
//creating methods that will be used by the schema
exports.User.methods = {
    authenticate: function (plainText) {
        // this.hashedPassword = plainText + 'random_hash123';
        console.log('Hashed password = ' + this.hashedPassword);
        console.log('encrypted password = ' + this.encryptPassword(plainText));
        console.log('Login permitted = ' + bcrypt_1.default.compareSync(plainText, this.hashedPassword));
        return bcrypt_1.default.compareSync(plainText, this.hashedPassword);
    },
    //function that will use a built in algorithm to encrypt user password
    encryptPassword: function (password) {
        if (!password)
            return '';
        try {
            let hash = bcrypt_1.default.hashSync(password, 2);
            return hash;
        }
        catch (err) {
            return '0';
        }
    },
};
const UserModel = mongoose_2.default.model('User', exports.User);
exports.default = UserModel;
