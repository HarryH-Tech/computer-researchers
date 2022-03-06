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
const ResearchContext_1 = require("../context/ResearchContext");
const Modal_1 = __importDefault(require("react-bootstrap/Modal"));
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const react_bootstrap_icons_1 = require("react-bootstrap-icons");
const EditModal = () => {
    // const [updatedResearcher, setUpdatedResearcher] = useState({
    //   name: '',
    //   description: '',
    //   dob: '',
    // });
    const { researcher, showEditModal, setResearcher, setShowEditModal, editResearcher, } = (0, react_1.useContext)(ResearchContext_1.ResearchContext);
    const handleInputChange = (e) => {
        console.log(researcher);
        setResearcher(Object.assign(Object.assign({}, researcher), { [e.currentTarget.id]: e.currentTarget.value }));
    };
    const confirmEditResearcher = (e) => {
        editResearcher(researcher);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Modal_1.default, { show: showEditModal, backdrop: "static", onHide: () => setShowEditModal(false) },
            react_1.default.createElement(Modal_1.default.Header, { closeButton: true },
                react_1.default.createElement(Modal_1.default.Title, null,
                    react_1.default.createElement("input", { onChange: handleInputChange, value: researcher.name, name: "name", id: "name" }),
                    react_1.default.createElement("br", null)),
                react_1.default.createElement("input", { onChange: handleInputChange, value: researcher.dob, name: "dob", id: "dob" })),
            react_1.default.createElement(Modal_1.default.Body, null,
                ' ',
                react_1.default.createElement("textarea", { 
                    //Avoids throwing error that e:FormEvent is not assignable to textarea elements
                    // @ts-expect-error
                    onChange: handleInputChange, value: researcher.description, name: "description", id: "description", rows: 6, style: { width: '100%' } })),
            react_1.default.createElement(Modal_1.default.Footer, { id: "modal-footer" },
                react_1.default.createElement(Button_1.default, { variant: "primary", onClick: () => setShowEditModal(false) },
                    "Close ",
                    react_1.default.createElement(react_bootstrap_icons_1.XCircleFill, null)),
                react_1.default.createElement(Button_1.default, { variant: "danger", onClick: confirmEditResearcher },
                    "Confirm Edit ",
                    react_1.default.createElement(react_bootstrap_icons_1.CheckCircleFill, null))))));
};
exports.default = EditModal;
