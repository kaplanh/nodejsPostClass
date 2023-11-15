"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions
//kimler nerelere ulasabilir onu belirlemek icin bu middleware i yaziyorum ve kullacagim router larda cagirip url ile require arasina kontrol icin yazip kullaniyorum

module.exports = {
    // mutlaka bir kullanici girisi bekledim yerlere
    isLogin: (req, res, next) => {
        if (process.env.NODE_ENV == "development") return next();

        if (req.user) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login.");
        }
    },
    // calisan veya admin in baglanabileci yerler icin
    isStaffOrAdmin: (req, res, next) => {
        if (process.env.NODE_ENV == "development") return next();

        if (req.user && (req.user.isStaff || req.user.isAdmin)) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login and to be Staff.");
        }
    },

    //sadece admin in baglanabileci yerler icin

    isAdmin: (req, res, next) => {
        if (process.env.NODE_ENV == "development") return next();

        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login and to be Admin.");
        }
    },
};