import userService from '../services/userService';
import jwt from "jsonwebtoken"
let handleLoging = async (req, res) => {
    // res.clearCookie("accessToken");
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
    if (userData.errCode === 0) {
        let token = jwt.sign({
            email: email
        }, process.env.JWT_ACCESS_KEY,
            { expiresIn: "30d" }
        )
        res.cookie("accessToken", token, {
            httpOnly: false,
            secure: false,
            path: "/",
            sameSite: false,
        });
        return res.status(200).json({
            token: token,
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    }
    // req.header.Authorization = token;
    // request.headers.authorization = token;
    return res.status(200).json({
        // token: token,
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleLogout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json("Logged out successfully!");
    } catch (error) {
        errMessage = 'chua dang nhap'
        return errMessage
    }
}

let handleGetAllUserss = async (req, res) => {
    try {
        let id = req.query.id;
        let users = await userService.getAllUsers(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            users
        })
    } catch (error) {
        errMessage = 'chua dang nhap'
        return errMessage
    }
}
let handleGetAllUsers = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let token = req.header('Authorization')
            let token = req.cookies.accessToken
            // let token = req.header('Authorization')
            let email = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            // res.json('welcom ' + email)
            let id = req.query.id;
            let users = await userService.getAllUsers(id);
            res.status(200).json({
                errCode: 0,
                errMessage: 'OK',
                users,
                // message: email
            })
        } catch (e) {
            res.json('not logged in yet')
            reject(e);
        }
    })
}
let handleCreateNewUsers = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let token = req.header('Authorization')
            let token = req.cookies.accessToken
            let email = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            let message = await userService.createNewUser(req.body);
            res.status(200).json({
                email: email,
                message
            });
        } catch (e) {
            res.json('not logged in yet')
            reject(e);
        }
    })
}
let handleCreateNewUserss = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUsers = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let token = req.header('Authorization')
            let token = req.cookies.accessToken
            let email = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            if (!req.body.id) {
                res.status(200).json({
                    errCode: 1,
                    errMessage: "Missing required parameters!"
                })
            }
            let message = await userService.deleteUser(req.body.id);
            return res.status(200).json({
                // email,
                message
            });
        } catch (e) {
            res.json('not logged in yet')
            reject(e);
        }
    })
}
let handleDeleteUserss = async (req, res) => {
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
    return new Promise(async (resolve, reject) => {
        try {
            // let token = req.header('Authorization')
            let token = req.cookies.accessToken
            let email = jwt.verify(token, process.env.JWT_ACCESS_KEY)
            let data = req.body;
            let message = await userService.updateUserData(data);
            res.status(200).json({
                email: email,
                message
            });
        } catch (e) {
            res.json('not logged in yet')
            reject(e);
        }
    })
}
let handleEditUsersss = async (req, res) => {
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
    handleLogout: handleLogout,
}