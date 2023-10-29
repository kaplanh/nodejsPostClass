"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const jwt = require("jsonwebtoken");
const setToken = require("../helpers/setToken");

const User = require("../models/user");

module.exports = {
    login: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Login'
            #swagger.description = 'Login with username and password'
            _swagger.deprecated = true
            _swagger.ignore = true
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: 'test',
                    password: '1234'
                }
            }
        */

        const { username, password } = req.body;

        if (username && password) {
            const user = await User.findOne({ username, password });
            //findOne() metodunda set metodu calisir ve db de ararken kullanicinin yazdigi 1234 gibi hali ile degil user modeldeki set yardii ile  sifrelenmis hali ile arama yapar set: (password) => passwordEncrypt(password)

            if (user) {
                if (user.isActive) {
                    // res.send({
                    //     error: false,
                    //     token: {
                    //         access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '10m' }),// acces tokeni kontrol ederken db ye gitme ihtiyaci hissetmeyecegiz ama refresh token i kontrol ederken db den kullaniciyi  check edecegiz böyle bir kullanici var mi yok mu diye
                    //         refresh: jwt.sign({ _id: user._id, password: user.password }, process.env.REFRESH_KEY, { expiresIn: '3d' }),//redresh datada sdc user._id ilede kullanici kontrolü yapabilirdim ama token ele gecirilirse kullanici password ünü degistirdiginde token i ele geciren giremesin istedigim icin passwordüde gönderdim bu arada username ve passwordude gönderebilirdim bu tercih meselesi
                    //     }
                    // })
                    // *Not:frontend ci login olduktan sonra one token objesi altinda acces ve refresh diye iki token gelecek. access token i alip sessionda refresh token i cookies e saklayacak 10dk boyunca header dan gönderdigi acces sayesinde  her url istek atip verileri alabilecek 10 dk sonra access in süresi bitince statuscode 200 den 401 e dönecek 401 dönünce cookies deki refresh kodu alip token:{refresh:....} seklinde body den refresh kodu gönderip yeni access kodu alacak ve onunla devam edecek

                    // const data = {
                    //     access: user.toJSON(),
                    //     refresh: { _id: user._id, password: user.password },
                    //     shortExpiresIn: '10m',
                    //     longExpiresIn: '3d'
                    // }

                    // res.send({
                    //     error: false,
                    //     token: {
                    //         access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
                    //         refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.longExpiresIn }),
                    //     }
                    // })

                    res.send({
                        error: false,
                        token: setToken(user),
                    });
                } else {
                    res.errorStatusCode = 401;
                    throw new Error("This account is not active.");
                }
            } else {
                res.errorStatusCode = 401;
                throw new Error("Wrong username or password.");
            }
        } else {
            res.errorStatusCode = 401;
            throw new Error("Please enter username and password.");
        }
    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Token Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    token: {
                        refresh: '...refreshToken...'
                    }
                }
            }
        */

        const refreshToken = req.body?.token?.refresh;

        if (refreshToken) {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_KEY,
                async function (err, userData) {
                    if (err) {
                        res.errorStatusCode = 401;
                        throw err;
                    } else {
                        const { _id, password } = userData;

                        if (_id && password) {
                            const user = await User.findOne({ _id });//*yukarda sorgularken passwordü göndermisken burda göndermiyoruz sebebi findOne set i calistirip passwordü sifreliyor yukarda sifreledi burdada sorgulasak burdada sifreleyecekti dolayisiyla ikikez sifreleyecekti o nedenle sdc _id den kullanici var mi diye cek ettik

                            if (user && user.password == password) {
                                if (user.isActive) {
                                    // const data = {
                                    //     access: user.toJSON(),
                                    //     refresh: { _id: user._id, password: user.password },
                                    //     shortExpiresIn: '10m',
                                    //     longExpiresIn: '3d'
                                    // }

                                    // res.send({
                                    //     error: false,
                                    //     token: {
                                    //         access: jwt.sign(data.access, process.env.ACCESS_KEY, { expiresIn: data.shortExpiresIn }),
                                    //         refresh: null
                                    //     }
                                    // })

                                    res.send({
                                        error: false,
                                        token: setToken(user, true), //refresh e basildiginda yeniden refresh token gitmesin diye isRefresh=false default degeri yerine   e true gönderiyoruz yani isRefresh=true oluyor ve setToken fonk ternary den dolayi 2.refresh olusmamis oluyor
                                    });
                                } else {
                                    res.errorStatusCode = 401;
                                    throw new Error(
                                        "This account is not active."
                                    );
                                }
                            } else {
                                res.errorStatusCode = 401;
                                throw new Error("Wrong id or password.");
                            }
                        } else {
                            res.errorStatusCode = 401;
                            throw new Error("Please enter id and password.");
                        }
                    }
                }
            );
        } else {
            res.errorStatusCode = 401;
            throw new Error("Please enter token.refresh");
        }
    },

    logout: async (req, res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Logout'
            #swagger.description = 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        */

        res.send({
            error: false,
            message:
                "No need any doing for logout. You must deleted Bearer Token from your browser.",
        });
    },
};


