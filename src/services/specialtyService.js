import axios from "../axios"
const createSpecialtyService=(data)=>{
    return axios.post("/api/create-specialty",data)
}
const getAllSpecialtyService=()=>{
    return axios.get("/api/get-all-specialty")
}
const getSpecialtyByIdService=(data)=>{
    return axios.get(`/api/get-specialty-by-id?id=${data.id}&location=${data.location}`)
}
export {
    createSpecialtyService,
    getAllSpecialtyService,
    getSpecialtyByIdService
}