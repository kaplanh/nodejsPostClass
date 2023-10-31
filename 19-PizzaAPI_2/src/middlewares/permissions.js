"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
    isLogin: (req, res, next) => {
        // return next();//test yaparken bu sarti saglayip saglamadigini kontrol etmesin atlasin isterken return next() kullanabiliriz

        if (req.isLogin) {
            next();
            // return next(); //seklinde return lüde yazabiliriz
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login.");
        }
    },
    
    isAdmin: (req, res, next) => {
        // return next();//test yaparken bu sarti saglayip saglamadigini kontrol etmesin atlasin isterken return next() kullanabiliriz
        
        if (req.isLogin && req.user.isAdmin) {
            next();
            // return next(); //seklinde return lüde yazabiliriz
        } else {
            res.errorStatusCode = 403;
            throw new Error("NoPermission: You must login and to be Admin.");
        }
    },
};
