'use strict';
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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });

const react_1 = __importStar(require('react'));
const axios_1 = __importDefault(require('axios'));
export const ResearchContext = (0, react_1.createContext)(null);
const ResearchProvider = ({ children }) => {
  const [researchers, setResearchers] = (0, react_1.useState)([]);
  const [researcher, setResearcher] = (0, react_1.useState)({
    _id: '',
    name: '',
    description: '',
    dob: '',
  });
  const [loading, setLoading] = (0, react_1.useState)(false);
  const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
  const [successMessage, setSuccessMessage] = (0, react_1.useState)('');
  const [showDeleteModal, setShowDeleteModal] = (0, react_1.useState)(false);
  const [showEditModal, setShowEditModal] = (0, react_1.useState)(false);
  // LIST ALL RESEARCHERS
  const getAllResearchers = () => {
    axios_1.default
      .get(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/get_all_researchers'
      )
      .then((res) => {
        setResearchers(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  // SHOW SPECIFIC RESEARCHER
  const getResearcher = (researcherName) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield axios_1.default.get(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL +
          `/get_researcher/${researcherName}`
      );
      console.log('res = ' + JSON.stringify(response.data));
      const { _id, name, description, dob } = response.data;
      setResearcher({
        _id,
        name,
        description,
        dob,
      });
    });
  // ADD NEW RESEARCHER
  const saveResearcher = (researcher) => {
    axios_1.default
      .post(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/create_researcher',
        {
          researcher,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // Call getAllResearchers again so researcher list can be rendered with added researcher
          setSuccessMessage('Researcher Successfullly Added 😁');
          getAllResearchers();
        } else {
          setErrorMessage(
            "Sorry, we couldn't add that right now. Please try again later."
          );
        }
      });
  };
  // DELETE RESEARCHER
  const deleteResearcher = (id) => {
    axios_1.default
      .delete(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/delete_researcher',
        {
          data: {
            id,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // Call getAllResearchers again so researcher list can be rendered with deleted researcher removed
          setSuccessMessage('Researcher Successfullly Deleted 😁');
          getAllResearchers();
        } else {
          setErrorMessage(
            "Sorry, we couldn't delete that right now. Please try again later."
          );
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  //DELETE MULTIPLE RESEARCHERS
  const deleteResearchers = (researchers) => {
    console.log(researchers);
    axios_1.default
      .delete(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/delete_researchers',
        {
          data: {
            ids: researchers,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage('Researchers Successfullly Deleted 😁');
        } else {
          setErrorMessage(
            "Sorry, we couldn't delete that right now. Please try again later."
          );
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  // EDIT RESEARCHER
  const editResearcher = () => {
    axios_1.default
      .put(
        process.env.REACT_APP_RESEARCHER_CRUD_BASE_URL + '/edit_researcher',
        {
          researcher,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage('Researcher Successfullly Edited 😁');
          getAllResearchers();
          setShowEditModal(false);
        } else {
          setErrorMessage(
            "Sorry, we couldn't edit that right now. Please try again later."
          );
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  return react_1.default.createElement(
    ResearchContext.Provider,
    {
      value: {
        researchers,
        researcher,
        errorMessage,
        loading,
        successMessage,
        showDeleteModal,
        showEditModal,
        saveResearcher,
        editResearcher,
        getAllResearchers,
        getResearcher,
        setErrorMessage,
        setLoading,
        setSuccessMessage,
        deleteResearcher,
        deleteResearchers,
        setShowDeleteModal,
        setShowEditModal,
        setResearcher,
      },
    },
    children
  );
};
const _default = ResearchProvider;
export { _default as default };
