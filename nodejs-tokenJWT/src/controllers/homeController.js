import db from '../models/index';
import user from '../models/user';
import CRUDService from '../services/CRUDService'
import jwt from "jsonwebtoken"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }



}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');

}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------------------------------');
    console.log(data);
    console.log('-------------------------------------');

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found

        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {

        return res.send('User not found')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);

    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('delete user succeed')
    }
    else {
        return res.send('user not found')
    }
}

let postLogin = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await CRUDService.checkUser(req.body.email);
            let token = jwt.sign({ email: req.body.email }, 'mk')
            // let token = jwt.sign({
            //     email: email
            // }, 'secret')
            if (isExist) {
                // message: token
                res.json({
                    message: 'login succeed',
                    token: token
                })
            } else {
                //return error
                res.send('user not found')
            }
        } catch (e) {
            reject(e);
        }
    })
}

let privatePage = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let token = req.cookies.token
            console.log(req.cookies.token)
            let ans = jwt.verify(token, 'mk')
            res.json('welcom ' + token)
        } catch (e) {
            res.json('dang nhap cai da')
            reject(e);
        }
    })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    postLogin: postLogin,
    privatePage: privatePage,
}