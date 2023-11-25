"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require('../models/user')
const Token = require('../models/token')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "1234",
                }
            }
        */

        const { username, email, password } = req.body

        if ((username || email) && password) {

            const user = await User.findOne({ $or: [{ username }, { email }] })//bu usernamede veya bu emailde bir user varsa bilgilerini getir

            if (user && user.password == passwordEncrypt(password)) {//set metodu ile degil pre('save) ile encrypt ettigimiz icin  burda karsilastirirken sifreleyip karsilastirdik set bunu otomatik yapiyordu onedenle ihtiyac duymuyorduk

                if (user.isActive) {
                    // login olan kisinin username veya email i ve passwordu varsa,gönderdigi passwordün sifreli hali DB deki passwordle ayniysa ve ve bu kisi isActive ise o zaman Token tablosunda  bu id(user._id ) ye ait bir token varsa onu tokenData ya aktar yoksa userId ve suanki tarihi alip sifreleyerek yeni bir token olustur ve response da token:tokenData.token da gönder

                    /* TOKEN */

                    let tokenData = await Token.findOne({ userId: user._id })//Token tablosunda bu id de token var mi

                    // token olustururken 
                    // *require('crypto').randomUUID() 
                    // kullanabilir yada asagidaki gibi manuel olarak olusturabilirim

                    if (!tokenData) {
                        let tokenKey = passwordEncrypt(user._id + Date.now())
                        tokenData = await Token.create({ userId: user._id, token: tokenKey })
                    }

                    res.send({
                        error: false,
                        token: tokenData.token,
                        user,
                    })
                    /* TOKEN */

                } else {

                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('Wrong username/email or password.')
            }
        } else {

            res.errorStatusCode = 401
            throw new Error('Please enter username/email and password.')
        }
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Logout"
            #swagger.description = 'Delete token key.'
        */

        const auth = req.headers?.authorization || null // Token ...tokenKey...
        const tokenKey = auth ? auth.split(' ')[1] : null // ['Token', '...tokenKey...']
        
        // Delete token from db:
        const tokenData = await Token.deleteOne({ token: tokenKey })

        res.send({
            error: false,
            message: 'Logout was OK.',
            data: tokenData
        })
    },

}