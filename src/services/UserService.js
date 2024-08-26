const User = require("../models/UserModel")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, password, confirmPassword } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The user is already'
                })
            }
            const createUser = await User.create({
                email,
                password,
                confirmPassword
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser
}