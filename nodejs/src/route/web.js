import express from "express";
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import { verifyToken } from "../controllers/verifyToken";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/login', homeController.getAboutPage);


    router.post('/login', homeController.postLogin);
    router.get('/private', homeController.privatePage);


    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);



    router.post('/api/login', userController.handleLoging);
    router.get('/api/users', userController.handleGetAllUsers);
    router.post('/api/users', userController.handleCreateNewUsers);
    router.put('/api/users', userController.handleEditUsers);
    router.delete('/api/users', userController.handleDeleteUsers);
    router.post('/api/logout', verifyToken, userController.handleLogout);

    router.get('/api/allcode', userController.getAllCode);
    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id',doctorController.getDetailDoctorById)

    return app.use("/", router);
}

// taskkill /F /IM node.exe
module.exports = initWebRoutes;