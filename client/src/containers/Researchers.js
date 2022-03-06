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
const react_router_dom_1 = require("react-router-dom");
const ResearchContext_1 = require("../context/ResearchContext");
const AuthContext_1 = require("../context/AuthContext");
const DeleteModal_1 = __importDefault(require("../components/DeleteModal"));
const EditModal_1 = __importDefault(require("../components/EditModal"));
const AddResearcher_1 = __importDefault(require("../components/AddResearcher"));
const Card_1 = __importDefault(require("react-bootstrap/Card"));
const ButtonGroup_1 = __importDefault(require("react-bootstrap/ButtonGroup"));
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const react_bootstrap_icons_1 = require("react-bootstrap-icons");
const Researchers = () => {
    const selectedResearchers = [];
    const { researchers, showDeleteModal, showEditModal, editResearcher, deleteResearchers, getAllResearchers, setShowDeleteModal, setShowEditModal, setResearcher, } = (0, react_1.useContext)(ResearchContext_1.ResearchContext);
    const { userLoggedInDetails, setUserLoggedInDetails } = (0, react_1.useContext)(AuthContext_1.AuthContext);
    // @ts-expect-error
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    // Display list of all researchers on initial render
    (0, react_1.useEffect)(() => {
        getAllResearchers();
    }, []);
    //  SHOW MODAL TO DELETE SPECIFIC RESEARCHER
    const handleDeleteResearcher = (e, id) => {
        e.preventDefault();
        setShowDeleteModal(true);
        const researcher = researchers.find((researcher) => researcher._id === id);
        setResearcher(researcher);
        console.log(researcher);
    };
    // SHOW MODAL TO EDIT RESEARCHER
    const handleEditResearcher = (e, id) => {
        e.preventDefault();
        setShowEditModal(true);
        const researcher = researchers.find((researcher) => researcher._id === id);
        setResearcher(researcher);
        console.log(researcher);
    };
    console.log(userLoggedInDetails);
    // Handle Selection of god via checkbox for deletion of multiple gods
    const handleSelection = (e) => {
        let index = selectedResearchers.indexOf(e.target.value);
        if (index > -1) {
            selectedResearchers.splice(index, 1);
        }
        else {
            selectedResearchers.push(e.target.value);
        }
        console.log(selectedResearchers.length);
    };
    const handleDeleteMultipleResearchers = () => {
        if (selectedResearchers.length > 0) {
            if (window.confirm('Are you sure you want to delete the selected researchers?')) {
                deleteResearchers(selectedResearchers);
            }
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        localStorageUser.role === 1 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(AddResearcher_1.default, null),
            selectedResearchers.length > 0 && (react_1.default.createElement("div", { style: { textAlign: 'center' } },
                react_1.default.createElement(Button_1.default, { disabled: selectedResearchers ? false : true, onClick: handleDeleteMultipleResearchers }, "Delete Researchers"))))),
        react_1.default.createElement("br", null),
        react_1.default.createElement("h3", { style: { textAlign: 'center', color: 'white' } },
            "Hi ",
            localStorageUser.username,
            "! \uD83D\uDE0A"),
        researchers.map((researcher) => (react_1.default.createElement(Card_1.default, { style: { width: '75%', margin: '3rem auto' }, key: Math.random() },
            react_1.default.createElement(Card_1.default.Body, null,
                react_1.default.createElement(Card_1.default.Title, { style: { textAlign: 'center', textDecoration: 'underline' } },
                    react_1.default.createElement(react_router_dom_1.Link, { to: `${researcher.name}` },
                        react_1.default.createElement("h2", null, researcher.name))),
                react_1.default.createElement("p", null, researcher.description),
                localStorageUser.role === 1 && (react_1.default.createElement(ButtonGroup_1.default, { style: {
                        display: 'flex',
                        width: '75%',
                        margin: 'auto',
                        gap: '5rem',
                    } },
                    react_1.default.createElement(Button_1.default, { style: { borderRadius: '1.5rem' }, variant: "danger", onClick: (e) => handleDeleteResearcher(e, researcher._id) },
                        "Delete ",
                        react_1.default.createElement(react_bootstrap_icons_1.XCircleFill, null)),
                    react_1.default.createElement(Button_1.default, { style: { borderRadius: '1.5rem' }, variant: "success", onClick: (e) => handleEditResearcher(e, researcher._id) },
                        "Edit ",
                        react_1.default.createElement(react_bootstrap_icons_1.Hammer, null)),
                    react_1.default.createElement("input", { type: "checkbox", value: researcher._id, onChange: handleSelection }))))))),
        react_1.default.createElement("br", null),
        showDeleteModal && react_1.default.createElement(DeleteModal_1.default, null),
        showEditModal && react_1.default.createElement(EditModal_1.default, null)));
};
exports.default = Researchers;
