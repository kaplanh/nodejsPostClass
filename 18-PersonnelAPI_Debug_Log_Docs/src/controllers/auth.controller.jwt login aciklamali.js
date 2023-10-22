"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

// Auth Controller:
// ?1- $ npm i jsonwebtoken
// ?2-jwt yi require( ediyoruz)
const jwt = require("jsonwebtoken");
// ?3-User (username ve passworden dolayi) modelini buraya cagiriyoruz
const User = require("../models/personnel.model");
// ?4-module.exports deyip süslüyü aciyor ve login,refresh ve logout metodlarini yaziyoruz
module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body; //*username&password girilmismi

        if (username && password) {
            const user = await User.findOne({ username, password }); //*girilmisse DB deki User model-tablosundan bu bilgileri barindiran useri bul getir

            if (user) {
                if (user.isActive) {
                    //*böyle bir user varsa aktif mi kontrol et

                    //  *kullanici actifse
                    // *accessData:istedigim tüm verileri barindiran
                    //* refreshData:id ve password verilerini barindiran iki data belirle

                    const accessData = {
                        //accessToken icinde kullaniciya göndermek istedigim data
                        _id: user._id,
                        departmentId: user.departmentId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isActive: user.isActive,
                        isAdmin: user.isAdmin,
                        isLead: user.isLead,
                    };

                    // * icine 3 parametre alan jwt.sign(1.accessData veya refreshData,2.ACCESS_KEY veya REFRESH_KEY,3.{gecerlilik süresi}) yardimiyla gelen veriyi imzalayip kilitleme accessToken ve refreshToken olusturma

                    const accessToken = jwt.sign(
                        accessData,
                        process.env.ACCES_KEY,
                        { expiresIn: "30m" } //bu süre toplantida belirlenir baslangicta 10dk olabilir ama kullanici sayici milyonlara varinca 1 saat yaparsiniz bu sayede DB yi yormaz performansi artisrmis olursunuz
                    );
                    const refreshData = {
                        //refreshToken icinde kullaniciya göndermek istedigim data
                        username: user.username,
                        password: user.password,
                    };

                    const refreshToken = jwt.sign(
                        refreshData,
                        process.env.REFRESH_KEY,
                        { expiresIn: "3d" }
                    );
                    // *res.send({}) ile  kullaniciya token objesi altinda  accesToken ve refreshToken adinda 2 token gönder
                    // NOT:her kisiye farkli token erildigi gibi
                    // Bir kisi farkli zamanlarda girdigindede farkli token verilir

                    // NOT:güvenligi artirmak icin ACCES_KEY ve REFRESH_KEY i farkli yazdim
                    // NOT:diyelimki sistemde supheli hareketler gördük bu durumunda sisteme bagli olan tüm kullanicilarin cikis yapmasini istersek .env deki ACCES_KEY i degistirirsek herkes 30m sonra cikmis olur ve refresh ile yenisini alabilirler
                    // ACCESS_KEY ve REFRESH_KEY  birlikte degistirirsem tüm kullanicilar hemen cikmak ve yeniden login olmak zorunda kalirlar
                    //SECRET_KEY i degistirirsem herkes cikmak ve sifrelerinide yenilemek zorunda kalir
                    // NOT:kötü niyetli biri  token i calarsa kullanici sifresini degistirirse belirlenen süreler bittiginde calan kisi artik birsey yapamaz

                    res.send({
                        error: false,
                        token: {
                            access: accessToken,
                            refresh: refreshToken,
                        },
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
        const refreshToken = req.body?.token?.refresh || null;

        if (refreshToken) {
            const jwtData = jwt.verify(refreshToken, process.env.REFRESH_KEY)
            const { username, password } = jwtData;
            const user = { username, password };
        
            if (user) {
                if (user.isActive) {
                    //*böyle bir user varsa aktif mi kontrol et

                    //  *kullanici actifse
                    // *accessData:istedigim tüm verileri barindiran
                    //* refreshData:id ve password verilerini barindiran iki data belirle

                    const accessData = {
                        //accessToken icinde kullaniciya göndermek istedigim data
                        _id: user._id,
                        departmentId: user.departmentId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isActive: user.isActive,
                        isAdmin: user.isAdmin,
                        isLead: user.isLead,
                    };

                    // * icine 3 parametre alan jwt.sign(1.accessData veya refreshData,2.ACCESS_KEY veya REFRESH_KEY,3.{gecerlilik süresi}) yardimiyla gelen veriyi imzalayip kilitleme accessToken ve refreshToken olusturma

                    const accessToken = jwt.sign(
                        accessData,
                        process.env.ACCES_KEY,
                        { expiresIn: "30m" } //bu süre toplantida belirlenir baslangicta 10dk olabilir ama kullanici sayici milyonlara varinca 1 saat yaparsiniz bu sayede DB yi yormaz performansi artisrmis olursunuz
                    );
                    const refreshData = {
                        //refreshToken icinde kullaniciya göndermek istedigim data
                        username: user.username,
                        password: user.password,
                    };

                    const refreshToken = jwt.sign(
                        refreshData,
                        process.env.REFRESH_KEY,
                        { expiresIn: "3d" }
                    );
                    // *res.send({}) ile  kullaniciya token objesi altinda  accesToken ve refreshToken adinda 2 token gönder
                    // NOT:her kisiye farkli token erildigi gibi
                    // Bir kisi farkli zamanlarda girdigindede farkli token verilir

                    // NOT:güvenligi artirmak icin ACCES_KEY ve REFRESH_KEY i farkli yazdim
                    // NOT:diyelimki sistemde supheli hareketler gördük bu durumunda sisteme bagli olan tüm kullanicilarin cikis yapmasini istersek .env deki ACCES_KEY i degistirirsek herkes 30m sonra cikmis olur ve refresh ile yenisini alabilirler
                    // ACCESS_KEY ve REFRESH_KEY  birlikte degistirirsem tüm kullanicilar hemen cikmak ve yeniden login olmak zorunda kalirlar
                    //SECRET_KEY i degistirirsem herkes cikmak ve sifrelerinide yenilemek zorunda kalir
                    // NOT:kötü niyetli biri  token i calarsa kullanici sifresini degistirirse belirlenen süreler bittiginde calan kisi artik birsey yapamaz

                    res.send({
                        error: false,
                        token: {
                            access: accessToken,
                            refresh: refreshToken,
                        },
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

    logout: async (req, res) => {
        //* jwt de bir logout yazmama gerek yok süre bitince  zaten token kullamma süresi bitecektir   ama biz yinede istersek diye buraya  bir mesaj yazalim dedik
        // NOT:frontend tarafinda logout olurken kullanici; beni hatirla dediyse sdc access token silinecek beni hatirla demedi ise her iki token ida silinecektir

        res.send({
            error: false,
            message:
                "No need any doing for logout. You must deleted Bearer Token from your browser.",
        });
    },
};
