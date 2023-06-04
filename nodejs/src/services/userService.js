import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);




let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName'],
                    where: { email: email },
                    raw: true,


                });
                if (user) {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);




                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);


                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';


                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }


            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}


let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }


        } catch (e) {
            reject(e)
        }
    })
}


let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            // users = await db.User.findAll({
            //     attributes: {
            //         exclude: ['password']
            //     }
            // })
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findAll({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
// dùng hasspassword khi cần tạo người dùng


let createNewUser = (data, currentUserId) => {
    return new Promise(async (resolve, reject) => {
        label: try {
            let check = await checkUserEmail(data.email);
            if (currentUserId !== 0) {
                resolve({
                    errCode: 2,
                    errMessage: `not allowed to create new user`
                })
                break label;
            }
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, plz try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar

                })
            }


            resolve({
                errCode: 0,
                errMessage: 'OK'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (userId, currentUserId) => {
    return new Promise(async (resolve, reject) => {
        if (userId === currentUserId || currentUserId === 0) {
            let foundUser = await db.User.findOne({
                where: { id: userId }
            })
            if (!foundUser) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }


            await db.User.destroy({
                where: { id: userId }




            })


            resolve({
                errCode: 0,
                errMessage: `The user is deleted`
            })
        }
        resolve({
            userId,
            currentUserId,
            errCode: 1,
            errMessage: `not allowed to delete other users`
        })
    })
}
// if(userId === currentUserId || currentUserId === "0") {
//     resolve({
//         errCode: 1,
//         errMessage: `not allowed to delete other users`
//     })
let updateUserData = (data, currentUserId) => {
    return new Promise(async (resolve, reject) => {
        label: try {
            // if (!data.id || !data.roleId || !data.positionId || !data.gender && !currentUserId) {
            //     resolve({
            //         errCode: 2,
            //         errMessage: 'Missing required parameters'
            //     })
            // }
            // if (currentUserId !== data.id.toString() && currentUserId !== "0") {
            //     resolve({
            //         errCode: 3,
            //         errMessage: `not allowed to edit other user`,
            //         // data
            //     })
            //     break label;
            // }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false


            })


            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update succeeds',
                    // data
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User is not found!`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService


}
