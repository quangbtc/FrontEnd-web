import axios from "../axios"
const handleLogin=(emailUser,passwordUser)=>{
    return axios.post('/api/login',{email:emailUser,password:passwordUser})
} 
const getAllUsers=(inputId)=>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService=(data)=>{
    return axios.post("/api/create-user",data)
}
const deleteUserService=(userId)=>{
    return axios.delete("/api/delete-user", {
        data: {
          id: userId
        }
      });
}
const editUserService=(inputData)=>{
    return axios.put("/api/edit-user",inputData)
}
const getAllCodeService=(inputData)=>{
    return axios.get(`/api/allcode?type=${inputData}`)
}

const getTopDoctorsService=(limit)=>{
    return axios.get(`/api/get-user-doctors?limit=${limit}`)
}
const getAllDoctorsService=()=>{
    return axios.get(`/api/get-all-doctors`)
}
const createInfoDoctorsService=(data)=>{
    return axios.post("/api/create-info-doctors",data)
}
const getDoctorDetailById=(doctorId)=>{
    return axios.get(`/api/get-detail-doctor?id=${doctorId}`)
}
const createDoctorScheduleService=(data)=>{
    return axios.post("/api/create-bulk-doctor-schedule",data)
}
const getDoctorScheduleService=(doctorId,date)=>{
    return axios.get(`/api/get-schedule-by-date-doctorId?doctorId=${doctorId}&date=${date}`)
}
const getProfileDoctorService=(doctorId)=>{
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const createBookingPatientService=(data)=>{
    return axios.post("/api/create-patient-booking-appointment",data)
}
const postVerifyBookingAppointment=(data)=>{
    return axios.post("/api/verify-booking-appointment",data)
}
export {handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorsService,
    getAllDoctorsService,
    createInfoDoctorsService,
    getDoctorDetailById,
    createDoctorScheduleService,
    getDoctorScheduleService,
    getProfileDoctorService,
    createBookingPatientService,
    postVerifyBookingAppointment
}