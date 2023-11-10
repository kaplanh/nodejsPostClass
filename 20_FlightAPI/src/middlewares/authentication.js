"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// app.use(authentication):

//Authentication middleware 'i ile ben kullanicinin headers dan Authorization basligi altinda Bearer ....token... bilgisini gönderip göndermedigini ve gönderdi ise split(' ') ile token bilgisini alip jwt.verify() ile jwt yi acip icindeki user bilgilerini aliyorum
// ve index.js de router lari cagirdigim yerin üzerinde bir yerde  bu middleware i cagiriyorum dolayisiyla access token dogru ise user bilgilerine bu sayede ulasmis olacagim yanlis ise user bilgisine ulasamayacagim icin permission islemlerinin oldugu yerlede admin veya login bilgisi lazim olacagindan o bilgilere ulasamadigim icin o route lara ulasamamis olacagim
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const auth = req.headers?.authorization || null
    const accessToken = auth ? auth.split(' ')[1] : null

    jwt.verify(accessToken, process.env.ACCESS_KEY, (err, userData) => req.user = userData)
    next()
}