import axios from "../axios"
const createSpecialtyService=(data)=>{
    return axios.post("/api/create-specialty",data)
}
const getAllSpecialtyService=()=>{
    return axios.get("/api/get-all-specialty")
}
export {
    createSpecialtyService,
    getAllSpecialtyService
}