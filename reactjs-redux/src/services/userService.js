import axios from '../axios'


const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const handleLogoutApi = () => {
    return axios.post('api/logout');
}
// const getAllUsers = (token) => {
//     return axios.get('/api/users', {
//         headers: { Authorization: `Bearer ${token}` },
//         // params: {
//         //     id: inputId
//         // }
//     });
// }


const getAllUsers = (inputId) => {
    return axios.get(`/api/users?id=${inputId}`);
}


// const createNewUserService = (data, token) => {
//     return axios.post('/api/users', data, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
// }
const createNewUserService = (data) => {
    return axios.post('/api/users', data);
}
const DeleteUserService = (userId, token) => {
    return axios.delete('/api/users', {
        data: {
            id: userId
        },
        headers: { Authorization: `Bearer ${token}` },
    });
}
const editUserService = (inputData, token) => {
    return axios.put('/api/users', inputData, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
const getAllcodeSevice = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)
}
const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

export { getDetailInforDoctor, saveDetailDoctorService, getAllDoctors, getTopDoctorHomeService, getAllcodeSevice, handleLoginApi, getAllUsers, createNewUserService, DeleteUserService, editUserService, handleLogoutApi };

