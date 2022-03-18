import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  resMessage: {},
  userArr: [],
  loadUserFail: {},
  arrDoctors: [],
  listDoctors: [],
  rangeTime:[],
  listInfoDoctors:[]
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //GENDER
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = true;
      state.genders = [];
      return {
        ...state,
      };
    //POSTION
    case actionTypes.FETCH_POSITION_START:
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.isLoadingPosition = true;
      state.positions = [];
      return {
        ...state,
      };
    //ROLE
    case actionTypes.FETCH_ROLE_START:
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoadingRole = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.isLoadingRole = true;
      state.roles = [];
      return {
        ...state,
      };
    //CREATE NEW USER
    case actionTypes.CREATE_USER_SUCCESS:
      state.resMessage = action.data;
      return {
        ...state,
      };
    case actionTypes.CREATE_USER_FAIL:
      state.resMessage = action.data;
      return {
        ...state,
      };
    //GET ALL USER
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.userArr = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.loadUserFail = action.data;
      return {
        ...state,
      };
    //GET USER DOCTOR
    case actionTypes.FETCH_USER_DOCTOR_SUCCESS:
      state.arrDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_DOCTOR_FAIL:
      state.arrDoctors = [];
      return {
        ...state,
      };
    //GET ALL DOCTOR
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.listDoctors = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAIL:
      state.listDoctors = [];
      return {
        ...state,
      };
        //GET ALLCODE TIME
    case actionTypes.FETCH_ALL_CODE_TIME_SUCCESS:
      state.rangeTime = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CODE_TIME_FAIL:
      state.rangeTime = [];
      return {
        ...state,
      };
      //GET ALL INFO DOCTOR
      case actionTypes.FETCH_ALL_INFO_DOCTOR_SUCCESS:
        state.listInfoDoctors = action.data;
        return {
          ...state,
        };
      case actionTypes.FETCH_ALL_INFO_DOCTOR_FAIL:
        state.listInfoDoctors = [];
        return {
          ...state,
        };
    default:
      return state;
  }
};

export default adminReducer;
