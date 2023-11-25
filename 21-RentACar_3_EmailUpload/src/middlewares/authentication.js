"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(authentication):

const User = require('../models/user')
const Token = require('../models/token')

module.exports = async (req, res, next) => {
    // ?piyasada bu isimlerlede karsilasabiliriz

    // Authorization: Token ...
    // Authorization: ApiKey ...
    // Authorization: X-API-KEY ...
    // Authorization: x-auth-token ...
    // Authorization: Bearer ...
    const auth = req.headers?.authorization || null // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey && tokenKey[0] == 'Token') {
        const tokenData = await Token.findOne({ token: tokenKey[1] })
        if (tokenData) req.user = await User.findOne({ _id: tokenData.userId })
    }

    next()
}


// kullanici login olup token i aldiktan sonra token ile ziyaret etmesi gereken url ler icin headers altinda authorization karsisinda Token ….Token_Key…. Gönderecek bosluktan split ederek  token tablosundaki token ile ayni ise next() ile bir sonraki isleme devam edecegiz