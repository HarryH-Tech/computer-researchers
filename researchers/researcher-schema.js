"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Researcher = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
exports.Researcher = new mongoose_1.Schema({
    name: String,
    description: String,
    dob: String,
});
const researchers = mongoose_2.default.model('researchers', exports.Researcher);
exports.default = researchers;
