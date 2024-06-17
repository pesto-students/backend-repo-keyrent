const userRoute = require('express').Router();

const userController = require('../controllers/user');

userRoute.get('/test', (req, res) => {
    return res.send({ test: 'ok' })
    // UserManagementController.getToken(req, res);
})

userRoute.post('/createuser', userController.createUser);
userRoute.post('/login', userController.loginUser);




// userRoute.get('/createuser', (req, res, next) => {
//     UserManagementController.createUser(req, res, next);
// })

module.exports = userRoute