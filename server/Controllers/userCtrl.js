const { request } = require('express')
const userModel = require('../db/models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const RegisterController = async(req, res) => {
    try {
        const { email } = req.body
        const existinguser = await userModel.findOne({ email: email })
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'User already Registered'
            })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt);
        req.body.password = hashedpassword;
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(200).send({
            success: true,
            message: 'User Registered'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error while registering'
        })
    }
}
let id;
const LoginController = async(req, res) => {
    try {
        const User = await userModel.findOne({ email: req.body.email });
        id = User._id;
        if (!User) {
            return res.status(200).send({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, User.password)
        if (!isMatch) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        const secretKey = 'yourSecretKeyHere';
        const token = jwt.sign({ id: User._id }, secretKey, { expiresIn: '1d' })
        res.status(200).send({
            success: true,
            message: "Successfully Login",
            token
        })
    } catch (err) {
        console.error(err)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            err
        })
    }
}
const ListDataController = async(req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        const arr = user.list;
        if (Object.keys(req.body).length === 0) {
            return res.status(200).send({
                success: false,
                message: 'Empty list'
            });
        }

        if (Object.keys(req.body).length > 0) {
            await arr.push(req.body);
            await user.save();
        }
        user.save();
        res.status(200).send({
            success: true,
            message: 'Successfully Added',
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Error in Data Insertion',
            success: false,
            err
        })
    }
}
const getdatacontroller = async(req, res) => {
    try {
        const user = await userModel.findById(req.userId);
        const listdata = user.list;
        res.status(200).send({
            success: true,
            message: 'Successfully got the data of list',
            listdata
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Error in Data retrieval',
            err
        })
    }
}
const removedatacontroller = async(req, res) => {
        try {
            const delTodoId = req.body.id
            const user = await userModel.findById(req.userId);
            let arr = user.list;
            let newarr = arr.filter((x) => {
                return x.id != delTodoId
            })
            user.list = newarr;
            user.save();
            res.status(200).send({
                success: true,
                message: 'Successfully removed'
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                message: 'Error in Deletion of data'
            })
        }
    }
    // getUserController.js
const getUserController = async(req, res) => {
    try {
        if (req.userId) {
            return res.status(200).json({
                success: true,
                message: 'User is logged in',
            });
        } else {
            return res.status(200).json({
                success: false,
                message: 'User is not logged in',
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Getting Data',
            err,
        });
    }
};


module.exports = { RegisterController, LoginController, ListDataController, getdatacontroller, removedatacontroller, getUserController }
