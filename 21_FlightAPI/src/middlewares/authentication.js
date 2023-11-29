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

    //Add createdId for all req.body:createdId user tablosu haric diger tüm tablolarda ortak bir field name normalde createdId yi field name ine ihtiyac duyan tablonun controlleri icinde create icine gidip req.body.createdId =req.user._id yazmam gerekiyordu fakat biz dedikki öyle bir yere yazalim ki her controller a tek tek yazmak zorunda kalmayalim bir yere yazalim hepsine ordan ulasssin her yere eklenmis olsun bu noktada aklimiza authentication middleware i geldi cünkü bu middleware jwt icindeki user bilgisine ulasabiliyor user verisini yakalamisken req.body e createdId yi ekleyelim bu sayede tüm modellere eklemis olduk
    req.body.createdId=req.user?._id
    next()
}