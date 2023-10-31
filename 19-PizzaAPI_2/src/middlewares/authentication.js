"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// app.use(authentication):

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // const accessToken = req.headers?.authorization.replaceAll('Bearer ')
    const auth = req.headers?.authorization; // Bearer ...token...
    const accessToken = auth ? auth.split(" ")[1] : null; // ['Bearer', '...token...']

    req.isLogin = false;
    req.user = null;
    // biz burda sdc jeton dogrumu süresi gecmis migecmemis mi yani jetondan veriyi alabiliyormuyum alamiyormuyum bunu kontrol ediyorum login meselesini daha sonra permissionlarda kontrol edecegiz
    // token gelmis ve süresi dolmamissa isLogin:true diyor user bilgilerni user a atiyoruz

    jwt.verify(accessToken, process.env.ACCESS_KEY, function (err, userData) {
        // 2 farkli sekilde yazilabilir  1-hata yoksa
        // if (!err) {
        //     req.isLogin = true;
        //     req.user = userData;
        // }
        // 2 farkli sekilde yazilabilir 2-  userData varsa ve userData.isActive ise
        if (userData && userData.isActive) {
            req.isLogin = true;
            req.user = userData;
        }
    });
    next();
};
