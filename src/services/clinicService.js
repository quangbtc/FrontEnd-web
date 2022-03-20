import axios from "../axios"

const getAllClinicService=()=>{
    return axios.get("/api/get-all-clinic")
}
const getClinicDetailById=(id)=>{
    return axios.get(`/api/get-clinic-by-id?id=${id}`)
}
export{
    getAllClinicService,
    getClinicDetailById
}