import axios from '../axios'


const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const handleLogoutApi = () => {
    return axios.post('api/logout');
}
const getAllUsers = (token) => {
    return axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        // params: {
        //     id: inputId
        // }
    });
}


// const getAllUsers = (inputId) => {
//     return axios.get('/api/users');
// }


const createNewUserService = (data, token) => {
    return axios.post('/api/users', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
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
export { handleLoginApi, getAllUsers, createNewUserService, DeleteUserService, editUserService, handleLogoutApi };

