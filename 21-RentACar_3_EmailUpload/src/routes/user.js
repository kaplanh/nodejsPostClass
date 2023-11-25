"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const permissions = require('../middlewares/permissions')
const user = require('../controllers/user')

// URL: /users

router.get('/verify', user.verify)

router.route('/')
    .get(permissions.isAdmin, user.list)//tüm users lari sadece admin listeleyebilir
    .post(user.create)//herkes bir user create edebilir

    // asagidaki gibide kullanabiliriz
    // .post(permission.isAdmin,user.create)//sadece admin bir user create edebilir
    // .post('/register',user.create)//herkes register olabilir

router
    .route("/:id")
    .get(permissions.isLogin, user.read) //bir user i login olan  herkes görüntüleyebilir  biz sdc kendi bilgilerini görebilsin ve  güncelleyebilsin istiyoruz ama burda  bir user baskasinin bilgilerini görebiliyor ve güncelleyebiliyor bu problem bunu cözmek icin controllers/user.js de read ve update fonksiyonlarina su kosulu eklemeliyiz
    // let filters = {};
    // if (!req.user?.isAdmin) filters = { _id: req.user._id }
    

            .put(permissions.isLogin, user.update) //bir user i login olan  herkes güncelleyebilir
            .patch(permissions.isLogin, user.update) //bir user i login olan  herkes güncelleyebilir
            .delete(permissions.isAdmin, user.delete);//bir user i sadece admin silebilir

/* ------------------------------------------------------- */
module.exports = router