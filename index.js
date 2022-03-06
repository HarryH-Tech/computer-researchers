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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const researcherCRUD = __importStar(require("./researchers/researcher-crud-mongo"));
const auth = __importStar(require("./user/auth"));
const path_1 = __importDefault(require("path"));
dotenv.config();
// Non null assertion operator (!) tells
//compiler that, although it cannot verify this,
// process.env.MONGO_DB will be defined
const uri = process.env.MONGO_DB;
mongoose_1.default.connect(uri, (err) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log('Connecting to Mongo');
    }
});
//If port cannot be found, throw fatal exception error
if (!process.env.PORT) {
    process.exit(1);
}
const app = (0, express_1.default)();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Required to push site to prod via Heroku
// Routes static file requests to the client
app.use(express_1.default.static(path_1.default.join(__dirname, 'client', 'build')));
// Custom Routes Related To Researchers
app.get('/api/get_all_researchers', researcherCRUD.getAllResearchers);
app.get('/api/get_researcher/:id', researcherCRUD.getResearcher);
app.post('/api/create_researcher', researcherCRUD.createResearcher);
app.delete('/api/delete_researcher', researcherCRUD.deleteResearcher);
app.delete('/api/delete_researchers', researcherCRUD.deleteResearchers);
app.put('/api/edit_researcher', researcherCRUD.editResearcher);
// Custom Routes Related To Auth/Users
app.post('/auth/login', auth.attemptLogin);
app.post('/auth/register', auth.register);
app.post('/auth/logout', auth.signOut);
// Also needed to push site to prod via Heroku
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'client', 'build', 'index.html'));
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
