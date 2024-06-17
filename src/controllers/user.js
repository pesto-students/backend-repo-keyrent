
const {createUserService, loginService} = require('../services/user')

    const createUser = async(req, res, next) =>{

        const newUser = await createUserService(req, res, next);
        // return res.sen/d(newUser);
        return newUser
    }

    const loginUser = async(req, res, next) =>{

        const login = await loginService(req, res, next);
        // return res.sen/d(newUser);
        return login
    }


    module.exports = {
        createUser: createUser,
        loginUser:loginUser
      };
      