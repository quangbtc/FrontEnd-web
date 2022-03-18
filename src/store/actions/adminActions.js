import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorsService,
  getAllDoctorsService,
  createInfoDoctorsService,
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,

// })
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderStart error:", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});
//POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_POSITION_START,
      });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetchPositionStart error:", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});
//ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_ROLE_START,
      });
      let res = await getAllCodeService("ROLE");

      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetchRoleStart error:", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});
export const createUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(createUserSuccess(res));
        dispatch(fetchAllUserStart()); //Refresh user
        toast.success("Create user was succeed!");
      } else {
        dispatch(createUserFail());
        toast.warn("Create user was failed!");
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("Save user fail:", e);
    }
  };
};
export const createUserSuccess = (messageData) => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  data: messageData,
});
export const createUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFail(res));
      }
    } catch (e) {
      dispatch(fetchAllUserFail());
      console.log("Fetch All User fail:", e);
    }
  };
};
export const fetchAllUserSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: userData,
});
export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});
//DELETE USER
export const deleteUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(data);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("User was deleted success!");
      } else {
        dispatch(deleteUserFail());
        toast.error("Delete error!");
      }
    } catch (e) {
      dispatch(deleteUserFail());
      toast.error("Delete error!");
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});
//EDIT USER ACTION
export const editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("Check res freom server:", res);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
        toast.success("User was edited success!");
      } else {
        dispatch(editUserFail());
        toast.error("Edit user error!");
      }
    } catch (e) {
      dispatch(editUserFail());
      toast.error("Edit user error!");
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});
//GET USER-DOCTOR
export const getUserDoctors = (limitInput) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorsService(limitInput);
      if (res && res.errCode === 0) {
        dispatch(fetchUserDoctorsSuccess(res.data));
      } else {
        console.log("FETCH_USER_DOCTOR_FAIL", res.massage);
        dispatch(fetchUserDoctorsFail());
      }
    } catch (e) {
      console.log("FETCH_USER_DOCTOR_FAIL", e);
      dispatch(fetchUserDoctorsFail());
    }
  };
};
export const fetchUserDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_USER_DOCTOR_SUCCESS,
  data: data,
});
export const fetchUserDoctorsFail = () => ({
  type: actionTypes.FETCH_USER_DOCTOR_FAIL,
});
//GET ALL DOCTORS
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        console.log("FETCH_ALL_DOCTOR_FAIL", res.massage);
        dispatch(fetchAllDoctorsFail());
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTOR_FAIL", e);
      dispatch(fetchAllDoctorsFail());
    }
  };
};
export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: data,
});
export const fetchAllDoctorsFail = () => ({
  type: actionTypes.FETCH_USER_DOCTORS_FAIL,
});
//CREATE INFO DOCTORS
export const createInfoDoctorStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createInfoDoctorsService(data);
      if (res && res.errCode === 0) {
        dispatch(createInfoDoctorSuccess(res));
        toast.success("Create info doctor was succeed!");
      } else {
        dispatch(createInfoDoctorFail());
        toast.warn("Create user was failed!");
        console.log("CREATE_INFO_DOCTORS_FAIL", res.massage);
      }
    } catch (e) {
      dispatch(createInfoDoctorFail());
      console.log("CREATE_INFO_DOCTORS_FAIL", e);
    }
  };
};
export const createInfoDoctorSuccess = () => ({
  type: actionTypes.CREATE_INFO_DOCTORS_SUCCESS,
});
export const createInfoDoctorFail = () => ({
  type: actionTypes.CREATE_INFO_DOCTORS_FAIL,
});
//GET RANGE TIME CODE
export const fetchTimeCodeStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");

      if (res && res.errCode === 0) {
        dispatch(fetchTimeCodeSuccess(res.data));
      } else {
        dispatch(fetchTimeCodeFail());
      }
    } catch (e) {
      dispatch(fetchTimeCodeFail());
      console.log("Fetch time code fail:", e);
    }
  };
};
export const fetchTimeCodeSuccess = (timeCode) => ({
  type: actionTypes.FETCH_ALL_CODE_TIME_SUCCESS,
  data: timeCode,
});
export const fetchTimeCodeFail = () => ({
  type: actionTypes.FETCH_ALL_CODE_TIME_FAIL,
});

//FETCH ALL INFO DOCTOR
export const fetchAllInfoDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let resData = {
          listPrice: resPrice.data,
          listPayment: resPayment.data,
          listProvince: resProvince.data,
        };
        dispatch(fetchAllInfoDoctorSuccess(resData));
      } else {
        dispatch(fetchAllInfoDoctorFail());
      }
    } catch (e) {
      dispatch(fetchAllInfoDoctorFail());
      console.log("Fetch all info doctor fail:", e);
    }
  };
};
export const fetchAllInfoDoctorSuccess = (resData) => ({
  type: actionTypes.FETCH_ALL_INFO_DOCTOR_SUCCESS,
  data: resData,
});
export const fetchAllInfoDoctorFail = () => ({
  type: actionTypes.FETCH_ALL_INFO_DOCTOR_FAIL,
});
