"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Catch async-errors and send to errorHandler:
require("express-async-errors");

const User = require("../models/userModel");

// ------------------------------------------
// User
// ------------------------------------------
module.exports.User = {
    list: async (req, res) => {
        const data = await User.find();

        res.status(200).send({
            error: false,
            count: data.length,
            result: data,
        });
    },

    create: async (req, res) => {
        const data = await User.create(req.body);

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        });
    },

    read: async (req, res) => {
        // req.params.userId
        // const data = await User.findById(req.params.userId)
        const data = await User.findOne({ _id: req.params.userId });

        res.status(200).send({
            error: false,
            result: data,
        });
    },

    update: async (req, res) => {
        // const data = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // return new-data
        // const data = await User.updateOne({ _id: req.params.userId }, req.body)
        const data = await User.updateOne(
            { _id: req.params.userId },
            req.body,
            { runValidators: true }
        );

        //update otomatik validation u calistirmiyor *{ runValidators: true } bunu 3.parametre olarak eklersek update yaparkende validate ettirmis oluyoruz

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await User.findOne({ _id: req.params.userId }),
        });
    },

    delete: async (req, res) => {
        const data = await User.deleteOne({ _id: req.params.userId });

        res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
    },

    login: async (req, res) => {
        const { email, password } = req.body; //email ve passwordü req.body den aldik

        if (email && password) {
            //email ve password varsa
            // const user = await User.findOne({ email: email, password: passwordEncrypt(password) })
            // No need passwordEncrypt, because using "set" in model:
            //* normalde ben req.body ile aldigim passwordü DB deki sifreli passwordle karsilastiracagim icin password: passwordEncrypt(password) seklinde sifreleyip karsilastirmam gerek fakat modeli belirlerken kullandigim set bunu default olarak hallediyor o nedenle buna gerek kalmiyor
            const user = await User.findOne({
                email: email,
                password: password,
            }); //emaili ve passwordü bu olan kullaniciyi bul user a ata
            if (user) {
                //bu bilgilere sahip bir user varsa yani bilgiler dogru ise

                // localStorage:sen silmedigin müddetce bilgi orda kalir
                // sessionStorage:tarayici kapanincaya kadar bilgi tutar
                // Cookies:belirlenen gün kadar veriler orda kalir

                // not:testleri postman de yap cünkü thunder bu session testlerinde cok basarili degil

                // Set Session:
                req.session = {
                    user: {
                        email: user.email,
                        password: user.password,
                    },
                };
                // Set Cookie:rememberMe geldiyse bu bilgiyi 3gün cookies de tut gelmezse üsteki req.sessiondan dolayi sdc tarayici kapanana kadar tutacak
                if (req.body?.rememberMe) {
                    // Set Cookie maxAge:
                    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
                }

                res.status(200).send({
                    error: false,
                    result: user,
                    session: req.session,//session verisinide döndürüyoruz
                });
            } else {
                //bu bilgilere sahip bir user yoksa yani bilgiler yanlis ise
                res.errorStatusCode = 401;
                throw new Error("Login parameters are not true.");
            }
        } else {
            //email ve password yoksa

            res.errorStatusCode = 400;
            throw new Error("Email and Password are required.");
        }
    },

    logout: async (req, res) => {
        // Set session to null:
        req.session = null;//session kayitlarini siliyor dolayisiylada kullanici cikis yapmis oluyor
        res.status(200).send({
            error: false,
            message: "Logout OK",
        });
    },
};
