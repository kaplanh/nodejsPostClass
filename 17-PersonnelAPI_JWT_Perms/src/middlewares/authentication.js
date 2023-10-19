"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const jwt = require("jsonwebtoken");
// NOT:collback te async ye gerek yok unutma
module.exports = (req, res, next) => {
    // kullanici login olduktan sonra bana bir ben ona bir token gönderecegim oda benim gönderdigim tokeni herader da authorization karsisinda Bearer ...token... olarak gönderecek bende gelen token i  req.headers?.authorization || null ile alip auth a atacagim sonra  auth ? auth.split(' ')[1] : null  ile gelen veriyi bosluktan bölüp 1.indexdeki veriyi yani token i alip accessToken a atyacagim artik token elimde
    const auth = req.headers?.authorization || null; // get Authorization
    const accessToken = auth ? auth.split(" ")[1] : null; // get JWT

    req.isLogin = false;
    // jwt.verify()ile gelen tokenin dogru olup-olmadigini süresinin gecip gecmedigini kontrol ediyoruz
    // 1.parametre:kontrol edecegi token(accessToken)
    // 2.parametre:hangi güvenlik key e göre cözümleyecegi(ACCES_KEY)
    // 3.parametre durumu veren callback fonks.(function(err, user))

    jwt.verify(accessToken, process.env.ACCESS_KEY, function (err, user) {
        if (err) {
            req.user = null; //jetonda hata varsa user=null ata
            console.log("JWT Login: NO");
        } else {
            //hata yoksa logini true ya cevir req.user=user yap verileri ver demek
            req.isLogin = true;
            req.user = user;
            // req.user = user.isActive ? user : null
            console.log("JWT Login: YES");
        }
    });
    next(); //sonraki root a gec
};

// index.js de bu middleware irouteslar öncesinde cagir kuullan
