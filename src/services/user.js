const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const  { User } = require("../model/user");
const db = require('../model');

    function verifyUser(req , res) {
        return res.send({ message: 'user' })
    }

    function getToken(req, res) {
        return res.send({ message: 'user' })
    }

    async function createUserService(req, res, next) {
        // const user = {
        //     id: 1,
        //     name: 'Amit',
        //     mobile: '8896406322',
        //     email: 'amit@gmail.com',
        //     password: '1234',
        //     type: 1
        // }
        // req.body = { ...user }
        console.log(req.body)

        try {
            let password;
            if (!req.body.name) {
                return res.send(403).send({ status: false, message: ' name is missing' })
            }
            // if (!req.body.mobile) {
            //     return res.send(403).send({ status: false, message: ' mobile is missing' })
            // }
            if (!req.body.email) {
                return res.send(403).send({ status: false, message: ' email is missing' })
            }
            if (!req.body.password) {
                return res.send(403).send({ status: false, message: ' password is missing' })
            }
            else {
                password = await bcrypt.hash(req.body.password, 8);
            }
            const result = await db.User.create({  name: req.body.name, mobile: req.body.mobile, email: req.body.email, password: password, type: 1 })
            result.password = "***********";
            res.status(200).send({ status: true, message: 'New user created', result })
        } catch (error) {
            console.log(error)
            res.send({ message: error })
            // res.status(500).send({ status: false, message: 'Something went wrong', error: error.errors[0].message })
        }
    }


     async function loginService(req , res, next) {
        try {
            let userName = '';
            let password = '';
            if (!req.body.email) {
                res.status(400).send({ status: false, message: 'email is missing' })
            } else {
                userName = req.body.email
            }
            if (!req.body.password) {
                res.status(400).send({ status: false, message: 'password is missing' })
            } else {
                password = req.body.password
            }

            const user = await db.User.findOne({email:userName})
            console.log({user})
            if (user.length == 0) {
                return res.status(401).send({ status: false, message: 'User does not exist' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                var token = jwt.sign({
                    id: user.id,
                }, 'secret', {
                    expiresIn: '2 days'
                });
                return res.status(200).send({ status: true, message: 'success', data: { userId: user.id, token: token } })
            } else {
                return res.status(401).send({ status: false, message: 'Password is incorrect' })
            }
        } catch (error) {
            next(error)
            return res.status(500).send({ status: false, message: 'Something went wrong', error })
        }
    }

module.exports = {
    createUserService: createUserService,
    loginService:loginService
    
}