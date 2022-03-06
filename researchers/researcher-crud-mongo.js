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
exports.editResearcher = exports.deleteResearchers = exports.deleteResearcher = exports.createResearcher = exports.getResearcher = exports.getAllResearchers = void 0;
const researcher_schema_1 = __importDefault(require("./researcher-schema"));
// LIST ALL RESEARCHERS
const getAllResearchers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    researcher_schema_1.default.find((err, response) => {
        if (err) {
            res.send('Sorry, there was a problem fetching the list of researchers, please try again.');
        }
        else {
            res.send(response);
        }
    });
});
exports.getAllResearchers = getAllResearchers;
// GET SPECIFIC RESEARCHER
const getResearcher = (req, res) => {
    researcher_schema_1.default.findOne(req.params, (err, researcher) => {
        res.send(researcher);
    });
};
exports.getResearcher = getResearcher;
// CREATE NEW RESEARCHER
const createResearcher = (req, res) => {
    const request = req.body.researcher;
    let researcher = new researcher_schema_1.default(request);
    researcher
        .save()
        .then((response) => {
        res.send('New Researcher Successfully created');
    })
        .catch((err) => {
        res.send('Unable to save researcner to database');
    });
};
exports.createResearcher = createResearcher;
// DELETE RESEARCHER
const deleteResearcher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        researcher_schema_1.default.deleteOne({ _id: req.body.id }, function (err, obj) {
            if (err) {
                res.send('Sorry, there was an error deleting the selected researcher, pleae try again.');
            }
        });
    }
    catch (error) {
        res.send('Sorry, there was an error deleting the selected researcher, pleae try again.');
    }
});
exports.deleteResearcher = deleteResearcher;
// DELETE MULTIPLE RESEARCHERS
const deleteResearchers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        researcher_schema_1.default.deleteMany({ _id: { $in: req.body.ids } }, function (err, obj) {
            res.send('Sorry, there was an error deleting the selected researchers, pleae try again.');
        });
    }
    catch (error) {
        return res.json({
            error: 'Sorry, there was an error deleting the selected researchers, pleae try again.',
        });
    }
});
exports.deleteResearchers = deleteResearchers;
// EDIT RESEARCHER
const editResearcher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        researcher_schema_1.default.updateOne({
            _id: req.body.researcher._id,
            name: req.body.researcher.name,
            description: req.body.researcher.description,
            dob: req.body.researcher.dob,
        }, function (err, obj) {
            if (err) {
                return res.json({
                    error: 'Sorry, there was an error editing the selected researcher, pleae try again.',
                });
            }
            else {
                res.send('Edited');
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.editResearcher = editResearcher;
