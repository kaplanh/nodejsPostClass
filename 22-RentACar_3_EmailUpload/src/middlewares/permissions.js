"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
    isLogin: (req, res, next) => {
        if (process.env.NODE_ENV == "development") return next();

        // any User:
        if (req.user && req.user.isActive) {
            //jwt de isActive kontrolüne gerek yok ama burda yapmaliyiz
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login.");
        }
    },

    isAdmin: (req, res, next) => {
        if (process.env.NODE_ENV == "development") return next();
        
        // only Admin:
        if (req.user && req.user.isActive && req.user.isAdmin) {
            next();
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login and to be Admin.");
        }
    },
};
