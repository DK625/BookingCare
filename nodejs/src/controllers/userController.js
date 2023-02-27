import userService from '../services/userService';
import jwt from "jsonwebtoken"
let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token
    let token = jwt.sign({
        email: email
    }, 'secret')
    return res.status(200).json({
        token: token,
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUsers = async (req, res) => {
    try {
        // let token = req.cookies.token;
        // let ketqua = jwt.verify(token, 'secret')
        let id = req.query.id;
        // let token = req.cookies.token
        // console.log(req.cookies.token)
        // let ans = jwt.verify(token, 'mk')
        // if (!id) {
        //     return res.status(200).json({
        //         errCode: 1,
        //         errMessage: 'Missing required parameter',
        //         users: []
        //     })
        // }
        let users = await userService.getAllUsers(id);
        return res.status(200).json({
            token: req.cookies.token,
            errCode: 0,
            errMessage: 'OK',
            users
        })
    } catch (error) {
        errMessage = 'chua dang nhap'
        return errMessage
    }
    // let id = req.query.id;
    // // if (!id) {
    // //     return res.status(200).json({
    // //         errCode: 1,
    // //         errMessage: 'Missing required parameter',
    // //         users: []
    // //     })
    // // }
    // let users = await userService.getAllUsers(id);
    // return res.status(200).json({
    //     errCode: 0,
    //     errMessage: 'OK',
    //     users
    // })
}
let handleCreateNewUsers = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUsers = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}
let handleEditUsers = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

module.exports = {
    handleLoging: handleLoging,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUsers: handleCreateNewUsers,
    handleDeleteUsers: handleDeleteUsers,
    handleEditUsers, handleEditUsers,
}