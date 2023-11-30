const express = require('express');
const {
    RegisterController,
    LoginController,
    ListDataController,
    getdatacontroller,
    removedatacontroller,
    getUserController
} = require('../Controllers/userCtrl');
const authmiddlewear = require('../Controllers/authmiddlewear');
const router = express.Router();
router.post('/register', RegisterController);
router.post('/login', LoginController);
router.post('/listdata', authmiddlewear, ListDataController);
router.get('/getdata', authmiddlewear, getdatacontroller);
router.post('/removedata', authmiddlewear, removedatacontroller);
router.get('/getUser', authmiddlewear, getUserController);
module.exports = router;