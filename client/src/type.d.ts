interface IResearcher {
  _id?: string;
  name: string;
  description: string;
  dob: string;
}

interface IUserRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserLoggedIn {
  username: string;
  token: string;
  role: number;
}

type AuthContextType = {
  userRegisterDetails: IUserRegister;
  userLoginDetails: IUserLogin;
  userLoggedInDetails: IUserLoggedIn;
  userErrorMessage;
  userLoading;
  userSuccessMessage;
  setUserLoginDetails: (user: IUserLogin) => void;
  setUserRegisterDetails: (user: IUserRegister) => void;
  setUserLoggedInDetails: (user: IUserLoggedIn) => void;
  attemptLogin: (formDetails: IUserLogin) => void;
  attemptRegister: (formDetails: IUserRegister) => void;
  setUserErrorMessage: (message: string) => void;
  setUserLoading: (status: boolean) => void;
  setUserSuccessMessage: (message: string) => void;
  logout: () => void;
};

type ResearcherContextType = {
  researchers: IResearcher[];
  researcher: IResearcher;
  errorMessage: string;
  loading: boolean;
  showDeleteModal: boolean;
  showEditModal: boolean;
  successMessage: string;
  deleteResearcher: (id: string) => void;
  deleteResearchers: (researcherIds: string[]) => void;
  getAllResearchers: () => void;
  getResearcher: (researcherName: string) => void;
  editResearcher: (researcher: IResearcher) => void;
  setErrorMessage: (message: string) => void;
  setLoading: (status: boolean) => void;
  setSuccessMessage: (message: string) => void;
  setShowDeleteModal: (status: boolean) => void;
  setShowEditModal: (status: boolean) => void;
  setResearcher: (researcher: IResearcher) => void;
  saveResearcher: (researcher: IResearcher) => void;
};
