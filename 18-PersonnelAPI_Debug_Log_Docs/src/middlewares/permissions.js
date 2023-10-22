"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
    isLogin: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login.");
        }
    },

    isAdmin: (req, res, next) => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login and to be Admin.");
        }
    },

    isAdminOrLead: (req, res, next) => {
        const departmentId = req.params?.id || null;

        if (
            req.user &&
            (req.user.isAdmin ||
                (req.user.isLead && req.user.departmentId == departmentId))
            // adminse girsin degilse ekipliderimi eger ekip lideri ise kendi departmaninin ekip liderimi öyleyse islem yap
        ) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error(
                "NoPermission: You must login and to be Admin or Department Lead."
            );
        }
    },

    isAdminOrOwner: (req, res, next) => {
        const userId = req.params?.id || null;

        if (
            req.user &&
            // (req.user.isAdmin || (req.user._id == userId && req.method != 'DELETE'))

            (req.user.isAdmin || req.user._id == userId) //admin veya herkes kendi bilgilerini degistirebilir
        ) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error(
                "NoPermission: You must login and to be Admin or Owner."
            );
        }
    },
};

// NOT:middleware ler app.use(require('./...')) icinde cagrilip kullanilabilecegi gibi
// /routes icinde hangi istegi hangi kullanici yapabilir bunun kontrolünü yapmak icin
// app.get(permissions.isLogin, department.list) seklinde konroller olarakta kullanilabilir
// route.delete(permissions.isAdmin, department.delete) admin olan silme islemi yapabilir
