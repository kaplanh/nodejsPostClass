"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
// Catch Errors:
module.exports((err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500;
    res.status(errorStatusCode).send({
        error: true,
        message: err.message,
        cause: err.cause,
        body: req.body, //gönderdigim kodu express nasil almis onu görmek icin
    });
});
// frontend ci statuscode a bakar ama ben kendimce bir kurgu yaptim
